# Museum Management App

## Deskripsi Produk

Museum Management App adalah aplikasi berbasis React Native yang memungkinkan pengguna untuk mengelola data museum secara efisien. Aplikasi ini memungkinkan pengguna untuk melakukan CRUD (Create, Read, Update, Delete) terhadap data museum seperti nama museum, hari buka, jam buka, harga tiket, dan rating museum. Pengguna dapat menambah, mengedit, dan melihat detail data museum, serta melihat tampilan daftar museum yang tersimpan.

## Komponen Pembangun Produk

Aplikasi ini dibangun menggunakan komponen-komponen berikut:

- **React Native**: Framework utama untuk membangun aplikasi mobile.
- **Fetch API**: Digunakan untuk berinteraksi dengan server backend untuk mengambil dan mengirim data museum.
- **React Hooks**: Digunakan untuk pengelolaan state dan lifecycle dalam aplikasi (seperti `useState`, `useEffect`).
- **FontAwesome**: Digunakan untuk menampilkan ikon-ikon seperti ikon bangunan dan ikon edit pada daftar museum.
- **FlatList**: Komponen untuk menampilkan daftar museum dengan efisien.
- **TextInput dan TouchableOpacity**: Digunakan untuk input data dan tombol interaksi pengguna.

### Sumber Data

Aplikasi ini mengambil dan mengirim data ke **API lokal** yang berjalan di server lokal dengan URL `http://192.168.100.13:3000/museum`. Server ini bertugas menyediakan data museum dalam format JSON yang dapat diambil dan diperbarui.

Data museum memiliki format berikut:

- `Museum`: Nama museum
- `Hari`: Hari museum buka
- `Jam`: Jam buka museum
- `Harga`: Harga tiket masuk
- `Rating`: Rating museum

### Fitur Utama

1. **Daftar Museum**: Menampilkan daftar semua museum yang tersimpan, dengan rincian seperti nama museum, hari buka, jam buka, harga tiket, dan rating.
2. **Formulir Input/Edit**: Pengguna dapat menambah atau mengedit data museum melalui formulir yang disediakan. Jika memilih data museum yang ada, pengguna dapat memperbarui informasi museum.
3. **Penyegaran Data**: Pengguna dapat memperbarui daftar museum dengan menyegarkan data yang ada.
4. **Validasi Data**: Menggunakan validasi untuk memastikan data museum yang dimasukkan benar dan lengkap.

### Tangkapan Layar
#### Tampilan Landing Page
![Landing Page](![image](https://github.com/user-attachments/assets/a970c7a1-f728-4678-8e38-6633910c3271)

#### Tampilan Daftar Museum
![Daftar Museum](![image](https://github.com/user-attachments/assets/247d60d4-e289-4a85-aa19-03063ef49302)


#### Tampilan Peta Persebaran Museum
![Peta Persebaran Museum](![image](https://github.com/user-attachments/assets/54f15ea4-0217-4f6e-a623-974f133d7de7)
)

### Cara Menjalankan Aplikasi

1. **Clone Repository**
   - Clone repositori ini ke mesin lokal Anda menggunakan perintah:
   ```bash
   git clone https://github.com/username/repository-name.git
