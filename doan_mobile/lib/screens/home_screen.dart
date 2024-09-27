import 'dart:convert';

import 'package:doan_mobile/screens/login_screen.dart';
import 'package:doan_mobile/widgets/plant_disease_list.dart';
import 'package:doan_mobile/widgets/plant_disease_upload.dart';
import 'package:doan_mobile/widgets/profile.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:motion_tab_bar/MotionTabBar.dart';
import 'package:motion_tab_bar/MotionTabBarController.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin {
  MotionTabBarController? _motionTabBarController;
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
  void initState() {
    super.initState();

    // use "MotionTabBarController" to replace with "TabController", if you need to programmatically change the tab
    _motionTabBarController = MotionTabBarController(
      initialIndex: 1,
      length: 3,
      vsync: this,
    );
  }

  @override
  void dispose() {
    super.dispose();

    // _tabController.dispose();
    _motionTabBarController!.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (currentUser.isEmpty) {
      getCurrentUser();
    }
    return Scaffold(
      appBar: AppBar(
        leading: const Icon(
          Icons.person,
          size: 40,
          color: Colors.white,
        ),
        title: Text(
          'Chào mừng ${currentUser['email']}',
          style: const TextStyle(
            color: Colors.white,
            fontSize: 18,
          ),
          maxLines: 2,
        ),
        backgroundColor: Colors.blueAccent,
        actions: [
          IconButton(
            onPressed: () async {
              showDialog<void>(
                context: context,
                barrierDismissible: false, // user must tap button!
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text('Thông báo'),
                    content: const SingleChildScrollView(
                      child: ListBody(
                        children: <Widget>[
                          Text('Bạn có muốn đăng xuất?'),
                        ],
                      ),
                    ),
                    actions: <Widget>[
                      TextButton(
                        child: const Text('Huỷ bỏ'),
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                      ),
                      TextButton(
                        child: const Text('Đồng ý'),
                        onPressed: () async {
                          await const FlutterSecureStorage()
                              .delete(key: 'accessToken');
                          // ignore: use_build_context_synchronously
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (context) => const LoginScreen(),
                            ),
                          );
                        },
                      ),
                    ],
                  );
                },
              );
            },
            icon: const Icon(Icons.logout),
            color: Colors.white,
          ),
        ],
      ),
      body: TabBarView(
        controller: _motionTabBarController,
        children: const <Widget>[
          PlantDiseaseList(),
          PlantDiseaseUpload(),
          Profile(),
        ],
      ),
      bottomNavigationBar: MotionTabBar(
        controller:
            _motionTabBarController, // ADD THIS if you need to change your tab programmatically
        initialSelectedTab: "Upload",
        labels: const ["History", "Upload", "Profile"],
        icons: const [Icons.dashboard, Icons.image, Icons.person],

        // // optional badges, length must be same with labels
        // badges: [
        //   // // Default Motion Badge Widget
        //   const MotionBadgeWidget(
        //     // text: '10+',
        //     textColor: Colors.white, // optional, default to Colors.white
        //     color: Colors.red, // optional, default to Colors.red
        //     size: 18, // optional, default to 18
        //   ),

        //   // custom badge Widget
        //   Container(
        //     color: Colors.black,
        //     padding: const EdgeInsets.all(2),
        //     child: const Text(
        //       '11',
        //       style: TextStyle(
        //         fontSize: 14,
        //         color: Colors.white,
        //       ),
        //     ),
        //   ),

        //   // allow null
        //   null,
        // ],
        tabSize: 50,
        tabBarHeight: 55,
        textStyle: const TextStyle(
          fontSize: 12,
          color: Colors.black,
          fontWeight: FontWeight.w500,
        ),
        tabIconColor: Colors.blue[600],
        tabIconSize: 28.0,
        tabIconSelectedSize: 26.0,
        tabSelectedColor: Colors.blue[900],
        tabIconSelectedColor: Colors.white,
        tabBarColor: Colors.white,
        onTabItemSelected: (int value) {
          setState(() {
            _motionTabBarController!.index = value;
          });
        },
      ),
    );
  }
}
