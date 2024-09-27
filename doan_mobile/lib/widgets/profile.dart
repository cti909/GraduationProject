import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

itemProfile(String title, String subtitle, IconData iconData) {
  return Container(
    decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
              offset: const Offset(0, 5),
              color: Colors.deepOrange.withOpacity(.2),
              spreadRadius: 2,
              blurRadius: 10)
        ]),
    child: ListTile(
      title: Text(title),
      subtitle: Text(subtitle),
      leading: Icon(iconData),
      tileColor: Colors.white,
    ),
  );
}

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  Map<String, dynamic> currentUser = {};
  bool isLoading = true;

  getCurrentUser() async {
    final cacheCurrentUser =
        await const FlutterSecureStorage().read(key: 'currentUser');
    debugPrint('===> cacheCurrentUser: $cacheCurrentUser');
    setState(() {
      currentUser = jsonDecode(cacheCurrentUser!);
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (currentUser.isEmpty) {
      getCurrentUser();
    }

    if (isLoading) {
      return Container(
        color: Colors.white,
        child: const Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(
              height: 20,
            ),
            Text(
              'Đang tải dữ liệu...',
              style: TextStyle(
                fontSize: 14,
                color: Colors.black,
                decoration: TextDecoration.none,
              ),
            ),
          ],
        ),
      );
    }

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              const SizedBox(height: 40),
              const CircleAvatar(
                radius: 70,
                backgroundImage: NetworkImage(
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQOCaOk-Z6esW3L1JUHTcwymUqVOO1b_25A&s'),
              ),
              const SizedBox(height: 20),
              itemProfile('Họ và Tên', currentUser['name'], Icons.person),
              const SizedBox(height: 10),
              itemProfile('Email', currentUser['email'], Icons.email),
              const SizedBox(height: 10),
              itemProfile(
                  'Số điện thoại', currentUser['phoneNumber'], Icons.phone),
              const SizedBox(height: 10),
              itemProfile('Địa chỉ', currentUser['address'], Icons.home),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ),
    );
  }
}
