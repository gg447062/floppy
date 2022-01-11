// const router = require('express').Router();
// const multer = require('multer');
// // const FFmpeg = require('fluent-ffmpeg');
// const { createFFmpeg } = require('@ffmpeg/ffmpeg');
// const ffmpegInstance = createFFmpeg({ log: true });
// let ffmpegLoading = ffmpegInstance.load();
// const getFFmpeg = async () => {
//   if (ffmpegLoading) {
//     await ffmpegLoading;
//     ffmpegLoading = undefined;
//   }
//   return ffmpegInstance;
// };

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 500 * 1024 * 1024 },
// });

// // POST /api/record
// router.post('/', upload.single('video'), async (req, res, next) => {
//   try {
//     const videoData = req.file.buffer;
//     const ffmpeg = await getFFmpeg();
//     const inputName = 'input.mp4';
//     const outputName = 'output.mp3';
//     ffmpeg.FS(
//       'writeFile',
//       inputName,
//       new Uint8Array(videoData, 0, videoData.byteLength)
//     );
//     await ffmpeg.run('-i', inputName, '-q:a', '0', '-map', 'a', outputName);
//     const output = ffmpeg.FS('readFile', outputName);
//     // ffmpeg.FS('unlink', inputName);
//     // ffmpeg.FS('unlink', outputName);

//     res.writeHead(200, {
//       'Content-Type': 'audio/mp3',
//       'Content-Disposition': `attachment;filename=${outputName}`,
//       'Content-Length': output.length,
//     });
//     res.end(Buffer.from(output, 'binary'));
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// module.exports = router;
