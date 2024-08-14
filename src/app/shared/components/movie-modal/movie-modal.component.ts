import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVideoContent } from '@shared/models/video-content.interface';
import { ImagePipe } from '@shared/Pipes/image.pipe';

@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [CommonModule, ImagePipe],
  templateUrl: './movie-modal.component.html',
  styleUrl: './movie-modal.component.scss'
})
export class MovieModalComponent
{


  constructor(@Inject(MAT_DIALOG_DATA) public data: IVideoContent)
  {

  }



}
