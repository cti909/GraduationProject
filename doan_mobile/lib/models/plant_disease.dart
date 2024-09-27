class PlantDisease {
  final String id;
  final String photo;
  final String name;
  final String createdAt;

  PlantDisease({
    required this.id,
    required this.photo,
    required this.name,
    required this.createdAt,
  });

  factory PlantDisease.fromJson(Map<String, dynamic> json) {
    return PlantDisease(
      id: json['id'],
      photo: json['photo'],
      name: json['name'],
      createdAt: json['createdAt'],
    );
  }
}
