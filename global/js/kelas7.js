const soalList = [
    {
        pertanyaan: "Apa itu Pancasila?",
        pilihan: [
            "Dasar negara Indonesia",
            "Lagu kebangsaan Indonesia",
            "Ibukota Indonesia",
            "Mata uang Indonesia"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Siapa yang menggagas Pancasila?",
        pilihan: [
            "Soekarno",
            "Mohammad Hatta",
            "Soeharto",
            "Megawati Soekarnoputri"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa arti Bhinneka Tunggal Ika?",
        pilihan: [
            "Berbeda-beda tetapi tetap satu jua",
            "Persatuan Indonesia",
            "Keadilan sosial bagi seluruh rakyat Indonesia",
            "Gotong royong"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Kapan Pancasila ditetapkan sebagai dasar negara Indonesia?",
        pilihan: [
            "17 Agustus 1945",
            "1 Juni 1945",
            "18 Agustus 1945",
            "28 Oktober 1928"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Apa yang dimaksud dengan norma?",
        pilihan: [
            "Aturan atau ketentuan yang mengikat warga kelompok dalam masyarakat",
            "Kebebasan tanpa batas",
            "Hukum yang tertulis",
            "Kebiasaan yang tidak mengikat"
        ],
        jawabanBenar: 0
    },
    {
        pertanyaan: "Apa yang dimaksud dengan hak asasi manusia?",
        pilihan: [
            "Hak yang diberikan oleh pemerintah",
            "Hak yang dapat dicabut sewaktu-waktu",
            "Hak dasar yang dimiliki manusia sejak lahir",
            "Hak yang hanya dimiliki oleh orang dewasa"
        ],
        jawabanBenar: 2
    },
    {
        pertanyaan: "Apa fungsi konstitusi dalam sebuah negara?",
        pilihan: [
            "Mengatur perdagangan internasional",
            "Menjadi dasar penyelenggaraan negara",
            "Mengatur hubungan antar negara",
            "Menentukan mata uang negara"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Apa yang dimaksud dengan demokrasi?",
        pilihan: [
            "Pemerintahan oleh satu orang",
            "Pemerintahan oleh rakyat",
            "Pemerintahan tanpa aturan",
            "Pemerintahan oleh militer"
        ],
        jawabanBenar: 1
    },
    {
        pertanyaan: "Siapa yang berhak memilih dalam pemilihan umum di Indonesia?",
        pilihan: [
            "Hanya laki-laki",
            "Hanya perempuan",
            "Warga negara yang berusia 17 tahun ke atas atau sudah menikah",
            "Hanya pegawai negeri"
        ],
        jawabanBenar: 2
    },
    {
        pertanyaan: "Apa yang dimaksud dengan toleransi?",
        pilihan: [
            "Sikap memusuhi perbedaan",
            "Sikap menghargai dan menghormati perbedaan",
            "Sikap acuh tak acuh terhadap perbedaan",
            "Sikap memaksakan keyakinan sendiri kepada orang lain"
        ],
        jawabanBenar: 1
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
