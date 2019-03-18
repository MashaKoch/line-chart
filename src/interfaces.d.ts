interface IAppState {
    amountPoint: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    checkedGrid: boolean;
    checkedLabelAxis: boolean;
    reDraw: boolean;
  }

  interface IParametrsFormProps {
    updateData(amount:number, valMinX:number, valMaxX:number, valMinY:number, valMaxY:number, chkGrid:boolean, chkLabel:boolean): void;
    updateGridAndLabel(chkGrid:boolean, chkLabel:boolean): void;
    amountPoint: number;
    minX: number;
    maxX: number;
    minY: number; 
    maxY: number;
    checkedGrid: boolean;
    checkedLabelAxis: boolean;
  }
  
  interface IParametrsFormState {
    amountPoint: number;
    minX: number;
    maxX: number;
    minY: number; 
    maxY: number;
    checkedGrid: boolean;
    checkedLabelAxis: boolean;
  }