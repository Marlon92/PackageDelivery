import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { ControlService } from '../services/control.service';
import { Globals } from '../shared/Globals';
import 'rxjs/Rx';
import 'rxjs/add/operator/filter/';
import 'rxjs/add/operator/map/';

@Component({
  selector: 'filmDetails',
  templateUrl: './filmDetails.component.html',
  styleUrls: ['./filmDetails.component.css']
})
export class FilmDetailsComponent {

  public model: any;
  public user: any;
  public film: any;
  public films: any[];
  public slug: any = '';
  public genreFilms: any[] = [];
  public comments: any[] = [];
  constructor(public controlService: ControlService, public globals: Globals, private router: Router,
              private http: Http, public route: ActivatedRoute) {

    const session = localStorage.getItem("session");
    this.user = JSON.parse(session).user;
    this.model = { 'name': '', 'photo': '', 'description': '', 'release_date': '', 'rating': '', 'ticket_price': '', 'genre': '' };
    //this.comments = [{ 'user': {'name': ''}, 'comment': '', 'comment_date': '' }];
    this.slug = this.route.snapshot.paramMap.get('slug');
  }

  ngOnInit() {

    this.controlService.find('films', this.slug)
       .subscribe((res) => {
         console.log(res);
         this.film = res.records[0];
         this.genreFilms = this.film.genre_film;
         this.model = { 'id': this.film.id, 'name': this.film.name, 'photo': this.film.photo, 'description': this.film.description,
                       'release_date': this.film.release_date, 'rating': this.film.rating,
                       'ticket_price': this.film.ticket_price, 'genre': this.film.description };

    //this.comments = this.film.post;
    });

    this.loadPosts();
  }

  public loadPosts() {
    this.controlService.find('post', this.slug)
    .subscribe((res) => {
      console.log(res);
      this.comments = res.records;
    });
  }

  public comment() {
    if (!this.globals.isLoggin()) {
      this.router.navigate(['/login']);
    } else {
      let post = { 'user_id': this.user.id, 'film_id': this.model.id, 'comment': this.model.comment };
      this.controlService.createRegister(post, 'post')
       .subscribe((res) => {
         this.loadPosts();
         this.model.comment = '';
       });
    }
  }
}
