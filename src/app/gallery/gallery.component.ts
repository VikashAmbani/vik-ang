import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { VkhtService } from '../service/vkht.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var MediaRecorder: any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  public video: any = document.getElementById('player');
  public stream
  public recorder;
  public vdeoList = [];
  public vdeoDList = []
  public autoVideoRecord = false
  public vdeoUrl: any
  public desableRecording = true
  public desableStop = true
  constructor(private callApi: VkhtService, private sanitizer: DomSanitizer, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.autoVideoRecord && this.requestPermission()
  }
  requestPermission() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((vstream) => {
      this.stream = vstream;
      // this.video.srcObject = this.stream;
      let th = this
      console.log('permission granted')
      this.autoVideoRecord && setTimeout(() => { th.recording() }, 1000)
      this.desableRecording = false
    }).catch((e) => { console.log(e) });
  }

  recording() {
    this.recorder = new MediaRecorder(this.stream);
    this.recorder.start();
    let th = this
    console.log('recording start')
    this.autoVideoRecord && setTimeout(() => { this.preparedata() }, 10000)
    this.desableStop = false
  }

  preparedata() {
    this.recorder.ondataavailable = (e) => {
      var v = URL.createObjectURL(e.data);
      this.vdeoList.push(e.data)
      let l = { "download": '', "href": '', "show": false };
      l.download = 'video_' + (new Date() + '').slice(4, 28) + '.webm'
      l.href = v
      this.VideoList = l
    };

    this.recorder.stop();
    console.log('preparedata', this.VideoList)
    let th = this
    this.desableStop = true
    this.ref.detectChanges();
    setInterval(() => {
      th.ref.markForCheck();
    }, 100);
    this.autoVideoRecord && setTimeout(() => { th.send() }, 1000)
  }
  send() {
    var data = new FormData();
    data.append('your_data', this.vdeoList[0])
    console.log('sending to server')
    this.callApi.post('public/filetime', data).subscribe((r: any) => {

    })
  }

  getUrl(a) {
    return this.sanitizer.bypassSecurityTrustUrl(a.href)
  }
  get VideoList() {
    return this.vdeoDList
  }
  set VideoList(obj: any) {
    this.vdeoDList.push(obj)
  }
  play(a,t){
    this.vdeoDList.forEach((e,i)=>{
      e.show=false;
    })
    if(t==0){
      this.vdeoUrl=this.sanitizer.bypassSecurityTrustUrl(a.href)
      a.show=true
    }else{
      this.vdeoUrl=null
      a.show=false
    }
  }
}
