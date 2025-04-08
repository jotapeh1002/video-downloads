import { Request, Response } from "express";
import { z } from "zod";
import { ErrorZod } from "../../error/ErrorZod";
import { spawn } from "child_process";

export class DownloadVideosController {
  async execute(req: Request, res: Response): Promise<void> {
    const userSchema = z.object({
      url: z
        .string()
        .refine((url) =>{
          const validUrls = [
            "https://www.youtube.com",
            "https://youtu.be",
            "https://www.youtu.be",
            "https://m.youtube.com",
          ];
          return validUrls.some((prefix) => url.includes(prefix));   
        }, {
          message: "URL inválida",
        }),
      type: z.string(),
    });

    const parsedData = userSchema.safeParse(req.query);
    if (!parsedData.success) {
      throw new ErrorZod(parsedData.error.errors, 400);
    }

    const { url, type } = parsedData.data;

    if (type === "mp3") {
      const ytDlp = spawn("yt-dlp", ["-f", "bestaudio", "-o", "-", url]);
      const ffmpeg = spawn("ffmpeg", [
        "-i", "pipe:0",
        "-f", "mp3",
        "-loglevel", "quiet",
        "pipe:1",
      ]);

      ytDlp.stdout.pipe(ffmpeg.stdin);

      res.setHeader("Content-Disposition", 'attachment; filename="audio.mp3"');
      res.setHeader("Content-Type", "audio/mpeg");

      ffmpeg.stdout.pipe(res);

      let ytDlpError = "";
      let ffmpegError = "";

      ytDlp.stderr.on("data", (data) => {
        ytDlpError += data.toString();
      });

      ffmpeg.stderr.on("data", (data) => {
        ffmpegError += data.toString();
      });

      ffmpeg.on("close", (code) => {
        if (code !== 0) {
          console.error("Erro ffmpeg:", ffmpegError);
          if (!res.headersSent) {
            res.status(500).end("Erro ao converter áudio");
          }
        }
      });

      ytDlp.on("close", (code) => {
        if (code !== 0) {
          console.error("Erro yt-dlp:", ytDlpError);
          ffmpeg.kill();
          if (!res.headersSent) {
            res.status(500).end("Erro ao baixar áudio");
          }
        }
      });

      res.on("close", () => {
        ytDlp.kill();
        ffmpeg.kill();
      });

      return;
    }
    const ytDlp = spawn("yt-dlp", ["-f", "best", "-o", "-", url]);

    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    res.setHeader("Content-Type", "video/mp4");

    ytDlp.stdout.pipe(res);

    let ytDlpError = "";

    ytDlp.stderr.on("data", (data) => {
      ytDlpError += data.toString();
    });

    ytDlp.on("close", (code) => {
      if (code !== 0) {
        console.error("Erro yt-dlp:", ytDlpError);
        if (!res.headersSent) {
          res.status(500).end("Erro ao baixar vídeo");
        }
      }
    });

    res.on("close", () => {
      ytDlp.kill();
    });
  }
}
