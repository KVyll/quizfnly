const soalList = [
    {
        pertanyaan: "Apa yang dimaksud dengan ideologi?",
        pilihan: [
            "Kumpulan ide atau gagasan",
            "Sistem kepercayaan yang menjadi dasar tindakan",
            "Teori ekonomi",
            "Aturan dalam masyarakat"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Apa fungsi Pancasila sebagai dasar negara?",
        pilihan: [
            "Sebagai sumber dari segala sumber hukum",
            "Sebagai lagu kebangsaan",
            "Sebagai lambang negara",
            "Sebagai mata uang resmi"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Siapa yang pertama kali mengemukakan istilah Pancasila?",
        pilihan: [
            "Soekarno",
            "Mohammad Hatta",
            "Mohammad Yamin",
            "Soepomo"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa yang dimaksud dengan konstitusi?",
        pilihan: [
            "Undang-undang dasar negara",
            "Peraturan daerah",
            "Keputusan presiden",
            "Peraturan pemerintah"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa yang dimaksud dengan kedaulatan rakyat?",
        pilihan: [
            "Kekuasaan tertinggi berada di tangan rakyat",
            "Kekuasaan tertinggi berada di tangan presiden",
            "Kekuasaan tertinggi berada di tangan DPR",
            "Kekuasaan tertinggi berada di tangan MPR"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa yang dimaksud dengan otonomi daerah?",
        pilihan: [
            "Kewenangan daerah untuk mengatur dirinya sendiri",
            "Kewenangan pusat untuk mengatur daerah",
            "Kewenangan negara lain untuk mengatur daerah",
            "Kewenangan provinsi untuk mengatur kabupaten"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa fungsi BPUPKI?",
        pilihan: [
            "Menyusun UUD",
            "Memproklamasikan kemerdekaan",
            "Mempersiapkan kemerdekaan Indonesia",
            "Membentuk kabinet"
        ],
        jawabanBenar: 2
    },
    {
        pertanyaan: "Apa yang dimaksud dengan hak interpelasi DPR?",
        pilihan: [
            "Hak untuk mengajukan pertanyaan kepada pemerintah",
            "Hak untuk mengusulkan pemberhentian presiden",
            "Hak untuk membuat undang-undang",
            "Hak untuk melakukan penyelidikan"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa yang dimaksud dengan good governance?",
        pilihan: [
            "Pemerintahan yang baik",
            "Pemerintahan yang kuat",
            "Pemerintahan yang otoriter",
            "Pemerintahan yang lemah"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa yang dimaksud dengan civil society?",
        pilihan: [
            "Masyarakat sipil",
            "Masyarakat militer",
            "Masyarakat pedesaan",
            "Masyarakat perkotaan"
        ],
        jawabanBenar: 0
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
            window.location.href = 'index.html';
        });
    }
});
