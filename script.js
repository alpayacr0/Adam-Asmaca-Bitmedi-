'use strict';

// const t = document.querySelector("h1").textContent;

let oyun = {
    kelime  : ["ADANA", "FRANSA", "SOFYA", "GÜMÜŞHANE", "YUNANİSTAN", "HELSİNKİ", "BÜKREŞ"],
    ipucu   : ["Şehir(Tr)", "Ülke", "Başkent", "Şehir(Tr)", "Ülke", "Başkent", "Başkent"],
    alfabe  : "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZabcçdefgğhıijklmnoöprsştuüvyzQWXqwx",
    girilenHarfler  : [],
    tahminNo: 0,

    yeniOyun: function(){
        this.tahminNo = 0;
        this.girilenHarfler = [];
        this.soruBelirle();
        let çizgiler = "";
        for(let i=0; i<= this.soru.length; i++){
            çizgiler = çizgiler + "_";}
        // Görsel alanı ilk duruma getirme
        document.querySelector("#kelime").textContent = çizgiler;
        document.querySelector("#ipucu").textContent = this.hint;
        document.querySelector(".inp").value = "";
        document.querySelector(".inp").disabled = false;
        document.querySelector(".btn").disabled = false;
        document.querySelector("body").backgroundColor = "#121213";
        document.querySelector("#resim").src = "Resimler/0.png";
        document.querySelector(".iska").textContent = "";
        mesajYaz("Yeni oyun başladı!");
    },

    soruBelirle :   function(){
        const soruNo = Math.trunc(Math.random()*this.kelime.length);
        oyun.soru = this.kelime[soruNo];
        oyun.hint = this.ipucu[soruNo];
    },

    tahmin: function(harf){
        this.girilenHarfler.push(harf); // Harfi girilenHarfler'e ekle

        // Soruda var olan bir harf ise
        if(this.soru.includes(harf))
        {
            mesajYaz("Tebrikler! Bu Harf Var ");
            let güncelSoru = "";
            for(let h of this.soru) // Orjinaş sorudaki her harf için;
            {
                if(this.girilenHarfler.includes(h)) güncelSoru += h;
                else güncelSoru += "_";
            }
            document.querySelector("#kelime").textContent = güncelSoru;

            // Oyunu kazandı mı ? 
            if(!güncelSoru.includes("_")){
                mesajYaz("Tebrikler! Oyunu kazandınız.");
                document.querySelector("body").style.backgroundColor ="darkgreen";
                document.querySelector(".inp").value = "";
                document.querySelector(".inp").disabled = true;
                document.querySelector(".btn").disabled = true;
            }
        }

        // Girilen harf soruda yok ise
        else
        {
            this.tahminNo++;    // Tahmin no'yu 1 arttır
            mesajYaz("Bu harf Maalesef yok");
            document.querySelector("#resim").src = "Resimler/"+String(this.tahminNo)+".png";
            document.querySelector(".iska").textContent += harf;

            // Oyunu kaybetti mi ? 
            if (this.tahminNo ===10) {
                mesajYaz("Oyunu Kaybettin!")
                document.querySelector("body").style.backgroundColor ="darkred";
                document.querySelector(".inp").value = "";
                document.querySelector(".inp").disabled = true;
                document.querySelector(".btn").disabled = true;    
            }
        }
    }
};

 function mesajYaz(msg){
     document.querySelector(".mesaj").textContent=msg;}
 
// Sorunun belirlenmesi ve ekrana yansıtılması
oyun.yeniOyun();

// Olay dinleyicisi (Event listener)

document.querySelector(".btn").addEventListener("click", function(){
    let harf = document.querySelector(".inp").value;
    harf = harf.toUpperCase()
    console.log(harf);
    // Harf girilmemiş ise
    if (!harf) mesajYaz("Harf Giriniz!"); 

    // Alfabe dışı bir harf girilmiş ise
    else if (!oyun.alfabe.includes(harf)) mesajYaz("Geçersiz Bir Karakter Girdiniz!")

    // Daha önce girilen bir harf girilmiş ise
    else if (oyun.girilenHarfler.includes(harf)){
        mesajYaz("Daha önce kullandığınız harf girdiniz!");
    } 
    // Geçerli Harf ise
    else{
        oyun.tahmin(harf)}
});

document.querySelector(".inp").addEventListener("keydown", function(e){

    if (e.keyCode ===13) { // Basılan tuş ENTER ise, 
        let harf = document.querySelector(".inp").value;
        harf = harf.toUpperCase()
        // Harf girilmemiş ise
        if (!harf) mesajYaz("Harf Giriniz!"); 

        // Alfabe dışı bir harf girilmiş ise
        else if (!oyun.alfabe.includes(harf)) mesajYaz("Geçersiz Bir Karakter Girdiniz!")

        // Daha önce girilen bir harf girilmiş ise
        else if (oyun.girilenHarfler.includes(harf)){
            mesajYaz("Daha önce kullandığınız harf girdiniz!");
        } 
        // Geçerli Harf ise
        else{
            oyun.tahmin(harf)}
    }
    document.querySelector(".inp").focus();
    document.querySelector(".inp").select();
});

document.querySelector(".new").addEventListener("click", function(){
    oyun.yeniOyun();
});