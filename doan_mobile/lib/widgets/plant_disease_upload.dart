import 'dart:io';

import 'package:doan_mobile/apis/service_api.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class PlantDiseaseUpload extends StatefulWidget {
  const PlantDiseaseUpload({super.key});

  @override
  State<PlantDiseaseUpload> createState() => _PlantDiseaseUploadState();
}

class _PlantDiseaseUploadState extends State<PlantDiseaseUpload> {
  File? imageSelected;
  bool isLoading = false;

  Future pickImageFromGallery() async {
    final image = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (image == null) return;

    setState(() {
      imageSelected = File(image.path);
    });
  }

  Future pickImageFromCamera() async {
    final image = await ImagePicker().pickImage(source: ImageSource.camera);
    if (image == null) return;

    setState(() {
      imageSelected = File(image.path);
    });
  }

  handleUpload(context) async {
    if (imageSelected == null) return;
    setState(() {
      isLoading = true;
    });
    final response = await ServicesAPI.uploadImage(imageSelected!);
    int statusCode = response['status'];
    final predictMessage = response['predictMessage']
        .toString()
        .replaceAll('__', ' ')
        .replaceAll('_', ' ');
    if (statusCode == HttpStatus.ok) {
      setState(() {
        isLoading = false;
      });
      showDialog<void>(
        context: context,
        barrierDismissible: false, // user must tap button!
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Kết quả nhận diện'),
            content: SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  Text('Nhận diện thành công: $predictMessage'),
                ],
              ),
            ),
            actions: <Widget>[
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
      // ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      //   behavior: SnackBarBehavior.floating,
      //   margin: const EdgeInsets.only(bottom: 100.0),
      //   content: Text(
      //     'Nhận diện thành công: $predictMessage',
      //     style: TextStyle(
      //       color: Colors.green[600],
      //       fontWeight: FontWeight.bold,
      //     ),
      //     textAlign: TextAlign.center,
      //   ),
      //   backgroundColor: Colors.white,
      // ));

      Future.delayed(const Duration(seconds: 2), () {});
    } else {
      setState(() {
        isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        behavior: SnackBarBehavior.floating,
        margin: const EdgeInsets.only(bottom: 100.0),
        content: Text(
          'Nhận diện thất bại',
          style: TextStyle(
            color: Colors.red[600],
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),
        backgroundColor: Colors.white,
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
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
              'Đang nhận diện...',
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
      body: Stack(
        children: [
          Column(
            children: [
              const SizedBox(
                height: 20,
              ),
              Stack(children: [
                SizedBox(
                  width: double.maxFinite,
                  height: 300,
                  child: Image(
                    image: imageSelected != null
                        ? FileImage(imageSelected!)
                        : Image.network(
                            'https://cdn4.vectorstock.com/i/1000x1000/58/48/blank-photo-icon-vector-3265848.jpg',
                          ).image,
                  ),
                ),
              ]),
              ElevatedButton(
                onPressed: () => handleUpload(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                ),
                child: const Text(
                  'Nhận diện',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              )
            ],
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Colors.blue, // Màu viền
                    width: 2.0, // Độ dày viền
                  ),
                ),
                child: IconButton(
                  icon: Icon(Icons.image_search),
                  iconSize: 30,
                  onPressed: () {
                    pickImageFromGallery();
                  },
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Colors.blue, // Màu viền
                    width: 2.0, // Độ dày viền
                  ),
                ),
                child: IconButton(
                  icon: Icon(Icons.camera_alt),
                  iconSize: 30,
                  onPressed: () {
                    pickImageFromCamera();
                  },
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
