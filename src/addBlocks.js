export default function addBlocks(editor, opts) {
  const componentType = opts.chartType;
  editor.BlockManager.add(componentType, {
    label: `
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<g>
		<rect y="464" width="512" height="32"/>
	</g>
</g>
<g>
	<g>
		<path d="M160,80H96c-8.832,0-16,7.168-16,16v320c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V96    C176,87.168,168.832,80,160,80z M144,400h-32V112h32V400z"/>
	</g>
</g>
<g>
	<g>
		<path d="M288,240h-64c-8.832,0-16,7.168-16,16v160c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V256    C304,247.168,296.832,240,288,240z M272,400h-32V272h32V400z"/>
	</g>
</g>
<g>
	<g>
		<path d="M416,16h-64c-8.832,0-16,7.168-16,16v384c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V32    C432,23.168,424.832,16,416,16z M400,400h-32V48h32V400z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
 ${opts.chartBlockName}`,
    category: "Charts",
    content: `
    <div data-gjs-type="${componentType}" style="width:400px; height:400px; display:block;">
      <canvas data-gjs-type="${componentType}_canvas" style="width:400px; height:400px" class="chartsjs"></canvas>
    </div>`,
  });
}
