const soalList = [
    {
        pertanyaan: "Apa yang dimaksud dengan globalisasi?",
        pilihan: [
            "Proses penyatuan berbagai elemen dunia menjadi satu kesatuan yang saling terhubung",
            "Proses pemisahan negara-negara di dunia",
            "Proses penguasaan dunia oleh satu negara",
            "Proses penghapusan batas-batas negara"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa yang dimaksud dengan politik luar negeri bebas aktif?",
        pilihan: [
            "Kebijakan yang mengikuti kepentingan negara lain",
            "Kebijakan yang tidak memihak blok manapun dan aktif dalam perdamaian dunia",
            "Kebijakan yang menutup diri dari dunia luar",
            "Kebijakan yang hanya berfokus pada kepentingan dalam negeri"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Apa fungsi utama Perserikatan Bangsa-Bangsa (PBB)?",
        pilihan: [
            "Mengatur perdagangan dunia",
            "Menjaga perdamaian dan keamanan internasional",
            "Mengontrol populasi dunia",
            "Menentukan mata uang global"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Apa yang dimaksud dengan hak asasi manusia?",
        pilihan: [
            "Hak yang diberikan oleh pemerintah",
            "Hak yang dapat dicabut sewaktu-waktu",
            "Hak dasar yang melekat pada diri manusia sejak lahir",
            "Hak yang hanya dimiliki oleh warga negara tertentu"
        ],
        jawabanBenar: 2
    },
    {
        pertanyaan: "Apa peran Mahkamah Konstitusi di Indonesia?",
        pilihan: [
            "Mengadili perkara pidana",
            "Menguji undang-undang terhadap UUD 1945",
            "Mengawasi kinerja pemerintah",
            "Membuat undang-undang"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Apa yang dimaksud dengan otonomi daerah?",
        pilihan: [
            "Kewenangan pemerintah pusat untuk mengatur daerah",
            "Hak, wewenang, dan kewajiban daerah untuk mengatur daerahnya sendiri",
            "Pemisahan daerah dari negara",
            "Penghapusan pemerintahan daerah"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Apa fungsi ASEAN bagi negara-negara Asia Tenggara?",
        pilihan: [
            "Menyatukan mata uang Asia Tenggara",
            "Membentuk tentara gabungan",
            "Meningkatkan kerja sama ekonomi, sosial, dan budaya",
            "Menghapuskan batas-batas negara di Asia Tenggara"
        ],
        jawabanBenar: 2
    },
    {
        pertanyaan: "Apa yang dimaksud dengan good governance?",
        pilihan: [
            "Pemerintahan yang otoriter",
            "Tata kelola pemerintahan yang baik dan bersih",
            "Pemerintahan tanpa oposisi",
            "Pemerintahan yang dipimpin oleh militer"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Apa peran Komisi Pemberantasan Korupsi (KPK) di Indonesia?",
        pilihan: [
            "Membuat undang-undang",
            "Mengadili perkara perdata",
            "Mencegah dan memberantas tindak pidana korupsi",
            "Mengawasi pemilihan umum"
        ],
        jawabanBenar: 2
    },
    {
        pertanyaan: "Apa yang dimaksud dengan civil society?",
        pilihan: [
            "Masyarakat yang dipimpin oleh militer",
            "Masyarakat yang tertutup dari dunia luar",
            "Masyarakat madani yang mandiri dan demokratis",
            "Masyarakat tanpa aturan hukum"
        ],
        jawabanBenar: 2
    }
];

let currentSoal = 0;
let poin = parseInt(localStorage.getItem('poin')) || 0;
let soalTerjawab = false;

function tampilkanSoal() {
    const soal = soalList[currentSoal];
    const soalContainer = document.getElementById('soal-container');
    soalContainer.innerHTML = `
        <h3>${soal.pertanyaan}</h3>
        <form id="formulir-kuis">
            ${soal.pilihan.map((pilihan, index) => `
                <label>
                    <input type="radio" name="jawaban" value="${index}">
                    ${pilihan}
                </label>
            `).join('')}
            <button id="jawab-button" class="button-soal" type="submit">Jawab</button>
        </form>
        <p id="hasil"></p>
    `;

    document.getElementById('formulir-kuis').addEventListener('submit', cekJawaban);
    soalTerjawab = false;
}

function cekJawaban(e) {
    e.preventDefault();
    if (soalTerjawab) return;

    const jawabanTerpilih = document.querySelector('input[name="jawaban"]:checked');
    const hasilElemen = document.getElementById('hasil');
    const jawabButton = document.getElementById('jawab-button');
    
    if (!jawabanTerpilih) {
        hasilElemen.textContent = 'Silakan pilih jawaban terlebih dahulu.';
        return;
    }

    const jawaban = parseInt(jawabanTerpilih.value);
    const soal = soalList[currentSoal];
    
    if (jawaban === soal.jawabanBenar) {
        hasilElemen.textContent = 'Benar! Anda mendapatkan 1000 poin.';
        poin += 1000;
        updatePoin();
    } else {
        hasilElemen.textContent = 'Maaf, jawaban Anda kurang tepat.';
    }

    document.getElementById('next-button').style.display = 'block';
    jawabButton.disabled = true;
    soalTerjawab = true;

    // Menonaktifkan semua input radio
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => input.disabled = true);
}

function nextSoal() {
    currentSoal++;
    if (currentSoal < soalList.length) {
        tampilkanSoal();
        document.getElementById('next-button').style.display = 'none';
    } else {
        document.getElementById('soal-container').innerHTML = '<h3>Anda telah menyelesaikan semua soal!</h3>';
        document.getElementById('next-button').style.display = 'none';
    }
}

function updatePoin() {
    document.getElementById('poin').textContent = poin;
    localStorage.setItem('poin', poin);
}

function resetPoin() {
    poin = 0;
    localStorage.setItem('poin', poin);
    updatePoin();
}

document.addEventListener('DOMContentLoaded', function() {
    tampilkanSoal();
    updatePoin();
    document.getElementById('next-button').addEventListener('click', nextSoal);
    
    // Tambahkan event listener untuk tombol kembali ke menu pilih kelas
    const backButton = document.getElementById('back-to-menu');
    if (backButton) {
        backButton.addEventListener('click', function() {
            resetPoin();
            // Arahkan kembali ke halaman menu pilih kelas
            window.location.href = 'pilih-kelas.html';
        });
    }
});
