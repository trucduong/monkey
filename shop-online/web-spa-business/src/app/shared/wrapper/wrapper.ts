import { Component, Input} from '@angular/core';
import { WrapperInfo } from './wraper.info';

@Component({
  selector: 'wrapper',
  templateUrl: 'src/app/shared/wrapper/wrapper.html'
})

export class WrapperCmp {
  @Input('info') info: WrapperInfo;
}
