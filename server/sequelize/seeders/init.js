'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await queryInterface.bulkInsert('Departments', [
      { id: 1, name: 'Mobil', description: null },
      { id: 2, name: 'Motor', description: null },
      { id: 3, name: 'Properti', description: null },
      { id: 4, name: 'Keperluan Pribadi', description: null },
      { id: 5, name: 'Elektronik & Gadget', description: null },
      { id: 6, name: 'Hobi & Olahraga', description: null },
      { id: 7, name: 'Rumah Tangga', description: null },
      { id: 8, name: 'Perlengkapan Bayi & Anak', description: null },
      { id: 9, name: 'Kantor & Industri', description: null },
      { id: 10, name: 'Jasa & Lowongan Kerja', description: null },
    ])

    await queryInterface.bulkInsert('Categories', [
      { id: 1, DepartmentId: 1, name: 'Mobil Baru', description: null, order: 0 },
      { id: 2, DepartmentId: 1, name: 'Mobil Bekas', description: null, order: 0 },
      { id: 3, DepartmentId: 1, name: 'Aksesoris', description: null, order: 0 },
      { id: 4, DepartmentId: 1, name: 'Audio Mobil', description: null, order: 0 },
      { id: 5, DepartmentId: 1, name: 'Sparepart', description: null, order: 0 },
      { id: 6, DepartmentId: 1, name: 'Velg dan Ban', description: null, order: 0 },
      { id: 7, DepartmentId: 2, name: 'Motor Baru', description: null, order: 0 },
      { id: 8, DepartmentId: 2, name: 'Motor Bekas', description: null, order: 0 },
      { id: 9, DepartmentId: 2, name: 'Aksesoris', description: null, order: 0 },
      { id: 10, DepartmentId: 2, name: 'Helm', description: null, order: 0 },
      { id: 11, DepartmentId: 2, name: 'Sparepart', description: null, order: 0 },
      { id: 12, DepartmentId: 3, name: 'Rumah', description: null, order: 0 },
      { id: 13, DepartmentId: 3, name: 'Apartemen', description: null, order: 0 },
      { id: 14, DepartmentId: 3, name: 'Indekos', description: null, order: 0 },
      { id: 15, DepartmentId: 3, name: 'Bangunan Komersil', description: null, order: 0 },
      { id: 16, DepartmentId: 3, name: 'Tanah', description: null, order: 0 },
      { id: 17, DepartmentId: 3, name: 'Properti Lainnya', description: null, order: 0 },
      { id: 18, DepartmentId: 4, name: 'Fashion Wanita', description: null, order: 0 },
      { id: 19, DepartmentId: 4, name: 'Fashion Pria', description: null, order: 0 },
      { id: 20, DepartmentId: 4, name: 'Jam Tangan', description: null, order: 0 },
      { id: 21, DepartmentId: 4, name: 'Pakaian Olahraga', description: null, order: 0 },
      { id: 22, DepartmentId: 4, name: 'Perhiasan', description: null, order: 0 },
      { id: 23, DepartmentId: 4, name: 'Make Up & Parfum', description: null, order: 0 },
      { id: 24, DepartmentId: 4, name: 'Terapi & Pengobatan', description: null, order: 0 },
      { id: 25, DepartmentId: 4, name: 'Perawatan', description: null, order: 0 },
      { id: 26, DepartmentId: 4, name: 'Nutrisi & Suplemen', description: null, order: 0 },
      { id: 27, DepartmentId: 4, name: 'Lainnya', description: null, order: 0 },
      { id: 28, DepartmentId: 5, name: 'Handphone', description: null, order: 0 },
      { id: 29, DepartmentId: 5, name: 'Tablet', description: null, order: 0 },
      { id: 30, DepartmentId: 5, name: 'Aksesoris HP & Tablet', description: null, order: 0 },
      { id: 31, DepartmentId: 5, name: 'Fotografi', description: null, order: 0 },
      { id: 32, DepartmentId: 5, name: 'Elektronik Rumah Tangga', description: null, order: 0 },
      { id: 33, DepartmentId: 5, name: 'Games & Console', description: null, order: 0 },
      { id: 34, DepartmentId: 5, name: 'Komputer', description: null, order: 0 },
      { id: 35, DepartmentId: 5, name: 'Lampu', description: null, order: 0 },
      { id: 36, DepartmentId: 5, name: 'TV, Audio & Video', description: null, order: 0 },
      { id: 37, DepartmentId: 6, name: 'Olahraga', description: null, order: 0 },
      { id: 38, DepartmentId: 6, name: 'Sepeda & Aksesoris', description: null, order: 0 },
      { id: 39, DepartmentId: 6, name: 'Handicraft', description: null, order: 0 },
      { id: 40, DepartmentId: 6, name: 'Barang Antik', description: null, order: 0 },
      { id: 41, DepartmentId: 6, name: 'Buku & Majalah', description: null, order: 0 },
      { id: 42, DepartmentId: 6, name: 'Koleksi', description: null, order: 0 },
      { id: 43, DepartmentId: 6, name: 'Mainan Hobi', description: null, order: 0 },
      { id: 44, DepartmentId: 7, name: 'Makanan & Minuman', description: null, order: 0 },
      { id: 45, DepartmentId: 7, name: 'Furniture', description: null, order: 0 },
      { id: 46, DepartmentId: 7, name: 'Dekorasi Rumah', description: null, order: 0 },
      { id: 47, DepartmentId: 7, name: 'Konstruksi & Taman', description: null, order: 0 },
      { id: 48, DepartmentId: 7, name: 'Jam', description: null, order: 0 },
      { id: 49, DepartmentId: 7, name: 'Lampu', description: null, order: 0 },
      { id: 50, DepartmentId: 7, name: 'Perlengkapan Rumah', description: null, order: 0 },
      { id: 51, DepartmentId: 7, name: 'Lain-Lain', description: null, order: 0 },
      { id: 52, DepartmentId: 8, name: 'Pakaian', description: null, order: 0 },
      { id: 53, DepartmentId: 8, name: 'Perlengkapan Bayi', description: null, order: 0 },
      { id: 54, DepartmentId: 8, name: 'Perlengkapan Ibu Bayi', description: null, order: 0 },
      { id: 55, DepartmentId: 8, name: 'Mainan Anak', description: null, order: 0 },
      { id: 56, DepartmentId: 8, name: 'Stroller', description: null, order: 0 },
      { id: 57, DepartmentId: 8, name: 'Lain-Lain', description: null, order: 0 },
      { id: 58, DepartmentId: 9, name: 'Peralatan Kantor', description: null, order: 0 },
      { id: 59, DepartmentId: 9, name: 'Perlengkapan Usaha', description: null, order: 0 },
      { id: 60, DepartmentId: 9, name: 'Mesin & Keperluan Industri', description: null, order: 0 },
      { id: 61, DepartmentId: 9, name: 'Stationery', description: null, order: 0 },
      { id: 62, DepartmentId: 9, name: 'Lain-Lain', description: null, order: 0 },
      { id: 63, DepartmentId: 10, name: 'Jasa', description: null, order: 0 },
      { id: 64, DepartmentId: 10, name: 'Lowongan', description: null, order: 0 },
      { id: 65, DepartmentId: 10, name: 'Cari Pekerjaan', description: null, order: 0 },
    ])

    await queryInterface.bulkInsert('Attributes', [
      { id: 1, name: 'Ukuran layar' },
      { id: 2, name: 'Warna' },
      { id: 3, name: 'Merk mobil' },
      { id: 4, name: 'Merk handphone' },
    ])

    await queryInterface.bulkInsert('AttributeValues', [
      { id: 1, AttributeId: 1, value: '4"' },
      { id: 2, AttributeId: 1, value: '5"' },
      { id: 3, AttributeId: 1, value: '5.5"' },
      { id: 4, AttributeId: 1, value: '6"' },
      { id: 5, AttributeId: 2, value: 'Hitam' },
      { id: 6, AttributeId: 2, value: 'Silver' },
      { id: 7, AttributeId: 2, value: 'Putih' },
      { id: 8, AttributeId: 3, value: 'Toyota' },
      { id: 9, AttributeId: 3, value: 'Suzuki' },
      { id: 10, AttributeId: 4, value: 'ASUS' },
      { id: 11, AttributeId: 4, value: 'LG' },
      { id: 12, AttributeId: 4, value: 'Samsung' },
      { id: 13, AttributeId: 4, value: 'Xiaomi' },
      { id: 14, AttributeId: 4, value: 'OPPO' },
    ])

    await queryInterface.bulkInsert('ProductTypes', [
      { id: 1, name: 'Handphone', description: null },
      { id: 2, name: 'Mobil', description: null },
    ])

    await queryInterface.bulkInsert('ProductTypeCategory', [
      { id: 1, ProductTypeId: 1, CategoryId: 28 },
      { id: 2, ProductTypeId: 2, CategoryId: 1 },
      { id: 3, ProductTypeId: 2, CategoryId: 2 },
    ])

    await queryInterface.bulkInsert('ProductTypeAttribute', [
      { id: 1, ProductTypeId: 1, AttributeId: 1 },
      { id: 2, ProductTypeId: 1, AttributeId: 2 },
      { id: 3, ProductTypeId: 1, AttributeId: 4 },
      { id: 4, ProductTypeId: 2, AttributeId: 2 },
      { id: 5, ProductTypeId: 2, AttributeId: 3 },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Attributes', null)
  }
};
