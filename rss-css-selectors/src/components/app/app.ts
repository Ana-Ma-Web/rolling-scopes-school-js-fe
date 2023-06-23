import { Data } from '../../types';
import { Field } from '../field/field';
import { HtmlViewer } from '../htmlViewer/htmlViewer';
import { Nav } from '../nav/nav';

export class App {
  constructor(private data: Data) {
    this.data = data;
  }

  public start(): void {
    const field = new Field(this.data);
    const htmlViewer = new HtmlViewer(this.data);
    const nav = new Nav(this.data);
    nav.printNavList();
    field.printField();
    htmlViewer.printHtmlViewer();
  }
}
