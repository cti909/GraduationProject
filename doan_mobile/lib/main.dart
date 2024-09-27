import 'package:doan_mobile/screens/home_screen.dart';
import 'package:doan_mobile/screens/login_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// ignore: null_check_always_fails
String? accessToken = null!;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  accessToken = await const FlutterSecureStorage().read(key: 'accessToken');
  debugPrint('===> accessToken: $accessToken');
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ứng dụng nhận diện bệnh của cây',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blueAccent),
        useMaterial3: true,
      ),
      home: accessToken != null && accessToken!.isNotEmpty
          ? const HomeScreen()
          : const LoginScreen(),
    );
  }
}
