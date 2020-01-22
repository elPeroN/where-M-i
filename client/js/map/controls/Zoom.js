class ZoomP extends IconButton{
  constructor(increment){
    super('zoom_in','mdc-button--raised mdc-image__circular');
    this.unbounded = true;
    this.listen('click', () => {
      console.log(getZoom())
      if(getZoom() < 21) setZoom(getZoom()+1);
    });
  }
}

class ZoomL extends IconButton{
  constructor(){
    super('zoom_out','mdc-button--raised mdc-image__circular');
    this.unbounded = true;
    this.listen('click', () => {
      if(getZoom() > 0) setZoom(getZoom()-1);
    });
  }
}
