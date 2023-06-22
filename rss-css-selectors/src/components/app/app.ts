import { Data } from '../../types';
import { Field } from '../field/field';
import { HtmlViewer } from '../htmlViewer/htmlViewer';

export class App {
  constructor(private data: Data) {
    this.data = data;
  }

  public start(): void {
    const field = new Field(this.data);
    const htmlViewer = new HtmlViewer(this.data);
    field.printField();
    htmlViewer.printHtmlViewer();
  }
}
