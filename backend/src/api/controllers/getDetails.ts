import { Request, Response } from "express";
import { z } from "zod";
import { ErrorZod } from "../../error/ErrorZod";
import { exec } from "child_process";
import { promisify } from "util";
import { ErrorApi } from "../../error/ErrorApi";

const execPromise = promisify(exec);

export class GetDetailsController {
  async execute(req: Request, res: Response): Promise<void> {
    const userSchema = z.object({
      url: z
        .string()
        .refine((url) =>{
          const validUrls = [
            "https://www.youtube.com/",
            "https://youtu.be/",
            "https://www.youtu.be/",
            "https://m.youtube.com/",
          ];
          return validUrls.some((prefix) => url.includes(prefix));   
        }, {
          message: "URL inválida",
        }),
    });

    const parsedData = userSchema.safeParse(req.query);
    if (!parsedData.success) {
      throw new ErrorZod(parsedData.error.errors, 400);
    }

    const { url } = parsedData.data;

    const sanitizedUrl = url.replace(/"/g, '\\"');

    const { stdout, stderr } = await execPromise(`yt-dlp --dump-json "${sanitizedUrl}"`);

    if (!stdout) {
      throw new ErrorApi("video not found", 500);
    }

    if (stderr) {
      throw new ErrorApi("video not found", 500);
    }
    const data = JSON.parse(stdout);

    const videoInfo = {
      title: data.title || "",
      thumbnail: data.thumbnail || "",
      description: data.description || "",
      originalURL: data.webpage_url || "",
      durationString: data.duration_string || "",
    };

    res.status(200).json({ statusCode: 200, message: videoInfo });
  }
}
