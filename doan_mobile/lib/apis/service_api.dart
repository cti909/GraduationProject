import 'dart:convert';
import 'dart:io';

import 'package:doan_mobile/models/plant_disease.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';

class ServicesAPI {
  static const storage = FlutterSecureStorage();
  static const base_url =
      "https://precise-dolphin-vast.ngrok-free.app"; // "https://192.168.1.11:5268";
  static final headers = {
    'Authorization': 'Bearer ${storage.read(key: 'accessToken')}',
    'Content-Type': 'application/json',
  };

  ServicesAPI._();

  // ----------------login----------------
  static Future<int> login(String email, String password) async {
    var url = Uri.parse('$base_url/api/auth/login');

    var data = {
      'email': email,
      'password': password,
    };

    var response =
        await http.post(url, headers: headers, body: jsonEncode(data));
    if (response.statusCode == HttpStatus.ok) {
      var data = jsonDecode(response.body);
      debugPrint('>>> data: $data');
      await storage.write(key: 'accessToken', value: data['accessToken']);
      await storage.write(key: 'userId', value: data['user']['id']);
      await storage.write(key: 'currentUser', value: jsonEncode(data['user']));
    }
    return response.statusCode;
  }

  // ----------------getAllPlantDisease----------------
  static Future<List<PlantDisease>> getAllPlantDiseaseByUser(page) async {
    final userId = await storage.read(key: 'userId');
    var url = Uri.parse(
        '$base_url/api/plantDisease?userId=$userId&page=$page&pageSize=9');

    var response = await http.get(url, headers: headers);

    if (response.statusCode == HttpStatus.ok) {
      debugPrint(response.body);
      List<dynamic> data = jsonDecode(response.body)['data'];
      List<PlantDisease> plantDiseases =
          data.map((item) => PlantDisease.fromJson(item)).toList();
      return plantDiseases;
    } else {
      throw Exception('Failed to load plant diseases');
    }
  }

  // ----------------getAllPlantDisease----------------
  static Future<Map<String, dynamic>> uploadImage(File imageFile) async {
    final userId = await storage.read(key: 'userId');
    var url = Uri.parse('$base_url/api/plantDisease/classifyPlantDisease');

    // Tạo multipart request
    var request = http.MultipartRequest('POST', url);

    // Thêm header
    request.headers.addAll({
      'Authorization': 'Bearer ${storage.read(key: 'accessToken')}',
      'Content-Type': 'multipart/form-data',
    });

    // Thêm file vào request
    request.fields['UserId'] = userId!;
    request.files.add(await http.MultipartFile.fromPath(
      'Photos', // Tên field trong API
      imageFile.path,
      // filename: basename(imageFile.path), // Tên file
    ));

    // Gửi request và nhận response
    var streamedResponse = await request.send();

    // streamedResponse.stream.transform(utf8.decoder).listen((value) {
    //   debugPrint('===> Data: $value');
    // });

    var response = await Response.fromStream(streamedResponse);
    debugPrint('===> response body: ${response.body}');
    final result = jsonDecode(response.body) as Map<String, dynamic>;
    int statusCode = result['status'];

    // Kiểm tra kết quả
    if (statusCode == HttpStatus.ok) {
      debugPrint('===> Upload thành công: $result');
      return result;
    } else {
      debugPrint('>>>> Upload thất bại: $statusCode');
      return result;
    }
  }
}
