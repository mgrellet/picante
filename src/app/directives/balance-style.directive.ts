import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBalanceStyle]'
})
export class BalanceStyleDirective implements OnInit{
  @Input('appBalanceStyle') balance!: number;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    console.log("balance", this.balance);
    this.renderer.setStyle(this.element.nativeElement, 'padding', '0px 5px 0px 10px');
    this.renderer.setStyle(this.element.nativeElement, 'border-radius', '40px');
    this.renderer.setStyle(this.element.nativeElement, 'color', '#ffffff');
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      this.balance > 0 ? '#f8746b' : '#7dd380'
    );
  }

}
