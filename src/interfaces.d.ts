type point = {x:number, y:number};

interface IAppState {
    amountPoint: number;
    minY: number;
    maxY: number;
    checkedGrid: boolean;
    checkedLabelAxis: boolean;
    reDraw: boolean;
    points: point[];
    width: number;
    height: number;
  }

  interface IParametrsFormProps {
    changeSize(width:number, height:number): void;
    updateGridAndLabel(chkGrid:boolean, chkLabel:boolean): void;
    generationPoints(amount:number, valMinY:number, valMaxY:number): void;
    amountPoint: number;
    minY: number; 
    maxY: number;
    checkedGrid: boolean;
    checkedLabelAxis: boolean;
    width: number;
    height: number;
  }
  
  interface IParametrsFormState {
    amountPoint: number;
    minY: number; 
    maxY: number;
    checkedGrid: boolean;
    checkedLabelAxis: boolean;
    width: number;
    height: number;
  }