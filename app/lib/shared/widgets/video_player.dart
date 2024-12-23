import 'package:app/shared/widgets/loader.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class AppVideoPlayer extends StatefulWidget {
  final String videoUrl;
  final bool playOnStart;

  const AppVideoPlayer({
    super.key,
    required this.videoUrl,
    required this.playOnStart,
  });

  @override
  State<AppVideoPlayer> createState() => _AppVideoPlayerState();
}

class _AppVideoPlayerState extends State<AppVideoPlayer> {
  late VideoPlayerController videoPlayerController;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    initVideoPlayer();
  }

  void initVideoPlayer() async {
    videoPlayerController = VideoPlayerController.networkUrl(
      Uri.parse(
        widget.videoUrl,
      ),
    )
      ..initialize().then((_) {
        setState(() {
          _isLoading = false;
        });
      })
      ..addListener(() {
        setState(() {
          _isLoading = videoPlayerController.value.isBuffering;
        });
      });

    if (widget.playOnStart) {
      videoPlayerController.play();
      videoPlayerController.setVolume(1);
    } else {
      videoPlayerController.pause();
    }
  }

  @override
  void dispose() {
    super.dispose();
    videoPlayerController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Center(
        child: AppLoader(size: 30),
      );
    }
    return AspectRatio(
      aspectRatio: videoPlayerController.value.aspectRatio,
      child: VideoPlayer(videoPlayerController),
    );
  }
}
