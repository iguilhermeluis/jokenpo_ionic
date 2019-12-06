import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { Vibration } from "@ionic-native/vibration";
import { NativeAudio } from "@ionic-native/native-audio";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  escolhaPlay: string;
  escolhaComputador: string = "Escolha uma opção";
  resultado: string = "Escolha uma opção";

  constructor(
    public navCtrl: NavController,
    private vibration: Vibration,
    private nativeAudio: NativeAudio,
    public platform: Platform
  ) {}
  ionViewDidLoad() {
    this.initializeSons();
  }

  initializeSons() {
    this.platform.ready().then(() => {
      this.nativeAudio
        .preloadSimple("ganhou", "assets/sounds/ganhou.mp3")
        .then();
      this.nativeAudio
        .preloadSimple("perdeu", "assets/sounds/perdeu.mp3")
        .then();
      //tipo complexo permite loop
      //preloadComplex(id, assetPath, volume, voices, delay)
      this.nativeAudio
        .preloadComplex("bg", "assets/sounds/bg-music.mp3", 1, 1, 0)
        .then(() => {
          this.nativeAudio.loop("bg").then(); // fica tocando musica de fundo
        });
    });
  }
  escolha(opcao) {
    this.vibration.vibrate(500);
    this.escolhaPlay = opcao;
    this.jokepon();
  }

  jokepon() {
    let numAleatorio = Math.floor(Math.random() * 3);
    let escolhaUsuario = this.escolhaPlay;
    let escolhaComputador = "";

    switch (numAleatorio) {
      case 0:
        escolhaComputador = "pedra";
        break;
      case 1:
        escolhaComputador = "papel";
        break;
      case 2:
        escolhaComputador = "tesoura";
        break;
      default:
        escolhaComputador = "";
    }

    let resultado = "";

    if (escolhaComputador === "pedra") {
      if (escolhaUsuario === "pedra") {
        resultado = "Empate";
      }

      if (escolhaUsuario === "papel") {
        resultado = "Você ganhou";
      }

      if (escolhaUsuario === "tesoura") {
        resultado = "Você perdeu";
      }
    }

    if (escolhaComputador === "papel") {
      if (escolhaUsuario === "papel") {
        resultado = "Empate";
      }

      if (escolhaUsuario === "tesoura") {
        resultado = "Você ganhou";
      }

      if (escolhaUsuario === "pedra") {
        resultado = "Você perdeu";
      }
    }

    if (escolhaComputador === "tesoura") {
      if (escolhaUsuario === "tesoura") {
        resultado = "Empate";
      }

      if (escolhaUsuario === "pedra") {
        resultado = "Você ganhou";
      }

      if (escolhaUsuario === "papel") {
        resultado = "Você perdeu";
      }
    }
    this.escolhaComputador = escolhaComputador;
    this.resultado = resultado;

    if (resultado == "Você ganhou") {
      this.nativeAudio.play("ganhou").then();
    } else if (resultado == "Você ganhou") {
      this.nativeAudio.play("ganhou").then();
    } else {
      this.nativeAudio.play("perdeu").then();
    }
  }
}
