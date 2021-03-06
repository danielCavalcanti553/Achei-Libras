import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Interprete } from '../model/interprete';
import { InterpreteService } from '../services/interprete.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-interpretes-update',
  templateUrl: './interpretes-update.page.html',
  styleUrls: ['./interpretes-update.page.scss'],
})
export class InterpretesUpdatePage implements OnInit {

  formGroup: FormGroup;
  interprete: Interprete = new Interprete();

  constructor(private formBuilder: FormBuilder,
    private InterpreteServ: InterpreteService,
    private template: TemplateService,

    private route: ActivatedRoute,
    private firestore: AngularFirestore) {
    this.iniciarForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(url => {
      let id = url.get('id');
      this.InterpreteServ.buscaPorId(id).subscribe(data => {
        this.interprete = data.payload.data();
        this.interprete.id = data.payload.id as string;
        this.iniciarForm();
      })
    })
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({

      username: [this.interprete.username, [Validators.email]],
      nome: [this.interprete.nome, [Validators.required, Validators.minLength(13), Validators.maxLength(16)]],
      grupo: [this.interprete.grupo, [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      cpf: [this.interprete.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cep: [this.interprete.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      endereco: [this.interprete.endereco, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],


    })
  }
  atualizar() {

    this.InterpreteServ.atualizar(this.interprete.id, this.formGroup.value).subscribe(data => {
      console.log(data);
      this.template.loading;
      this.template.myAlert('Atualizado com sucesso');


    })
  }

}