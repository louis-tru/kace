
import { Application,Window,Jsx } from 'quark';

const app = new Application();

const win = new Window().render(
	<free width="match" height="match">
		<text value="Hello world" textSize={48} align="centerMiddle" />
	</free>
);
