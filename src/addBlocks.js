import icon from "./icons/bar-chart.svg";
export default function addBlocks(editor, opts) {
  const componentType = opts.chartType;
  editor.BlockManager.add(componentType, {
    label: `
          ${icon} ${opts.chartBlockName}`,
    category: "Charts",
    content: `
    <div data-gjs-type="${componentType}" style="width:400px; height:400px; display:block;">
      <canvas data-gjs-type="${componentType}_canvas" style="width:400px; height:400px" class="chartsjs"></canvas>
    </div>`,
  });
}
