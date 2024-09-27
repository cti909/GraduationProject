import 'package:cached_network_image/cached_network_image.dart';
import 'package:doan_mobile/apis/service_api.dart';
import 'package:doan_mobile/models/plant_disease.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class PlantDiseaseList extends StatefulWidget {
  const PlantDiseaseList({super.key});

  @override
  State<PlantDiseaseList> createState() => _PlantDiseaseListState();
}

class _PlantDiseaseListState extends State<PlantDiseaseList> {
  List<PlantDisease> plantDiseases = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
  }

  // Hàm gọi API để lấy dữ liệu
  void fetchDataFromAPI() async {
    try {
      final plantDiseasesData = await ServicesAPI.getAllPlantDiseaseByUser(1);
      // Xử lý dữ liệu khi nhận về thành công (statusCode == 200)
      setState(() {
        plantDiseases = plantDiseasesData;
        isLoading = false;
      });
    } catch (error) {
      // Xử lý lỗi khi gọi API không thành công
      debugPrint('Error: $error');
    }
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (plantDiseases.isEmpty) {
      fetchDataFromAPI();
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

    return Container(
      padding: const EdgeInsets.only(
        bottom: 40,
      ),
      child: ListView.builder(
        itemCount: plantDiseases.length,
        itemBuilder: (BuildContext context, int index) {
          final plantDisease = plantDiseases[index];
          final name = plantDisease.name
              .replaceAll('__', ' ')
              .replaceAll('_', ' ')
              .trim();
          final thumbnailImg = '${ServicesAPI.base_url}${plantDisease.photo}';
          final createdTime = DateFormat('dd/MM/yyyy HH:mm:ss')
              .format(DateTime.parse(plantDisease.createdAt));
          return Container(
            margin: const EdgeInsets.symmetric(
              vertical: 4,
              horizontal: 8,
            ),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(
                width: 3.0,
                color: Colors.transparent,
              ),
              borderRadius: const BorderRadius.all(
                Radius.circular(
                  20,
                ),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: ListTile(
              leading: SizedBox(
                width: 80,
                height: 80,
                child: Image.network(
                  thumbnailImg,
                  width: 80,
                  height: 80,
                  fit: BoxFit.cover,
                ),
              ),
              title: SizedBox(
                width: 100,
                child: Text(
                  name,
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                  ),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              trailing: SizedBox(
                width: 80,
                child: Text(
                  createdTime,
                  style: const TextStyle(
                    color: Colors.grey,
                    fontSize: 14,
                  ),
                  textAlign: TextAlign.end,
                  maxLines: 2,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
