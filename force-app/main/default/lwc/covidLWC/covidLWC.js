/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable vars-on-top */
/* eslint-disable @lwc/lwc/no-api-reassignments */
/* eslint-disable no-alert */
import { LightningElement, api, track } from 'lwc';

export default class CovidLWC extends LightningElement {
    
  //  @api lastUpdated =this.summary.lastUpdatedAtApify.lastUpdatedAtApify.slice(0,10)
    @api statesData = [];
    @api summary = {}
    @track sortState = false;
    @api asc = this.statesData;

    connectedCallback(){
        this.fetchData();
        this.Ascend();
    //    setTimeout(() => {
     
    //    // console.log(this.desc);
    //    },3000 )
    }
  
 
    //fetch data from api
    @api
    async fetchData(){
    
        let govtApi = await fetch('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST')
    // let govtApi = await fetch('https://api.rootnet.in/covid19-in/stats/'); //replaced API to new for more data;
    if(govtApi.ok){
        let res = await govtApi.json();
       this.statesData = res.regionData
        this.summary = res;  
    }
    }
            
// format for Datatable 
 columns = [
    { label: 'Location', fieldName: 'region', sortable: true, },
    { label: 'Total Confirmed', fieldName: 'totalInfected', type: 'number', cellAttributes: { alignment: 'left' },},
    { label: 'New Cases', fieldName: 'activeCases', type: 'number',  cellAttributes: { alignment: 'left' }, },
     { label: 'New Infected', fieldName: 'newInfected', type: 'number',  cellAttributes: { alignment: 'left' }, },
    { label: 'New Deceased', fieldName: 'newDeceased', type: 'number',  cellAttributes: { alignment: 'left' }, },
    { label: 'Total Deceased', fieldName: 'deceased', type: 'number',  cellAttributes: { alignment: 'left' }, },
    { label: 'Total Recovered', fieldName: 'newRecovered', type: 'number',cellAttributes: { alignment: 'left' }, },
   

];    
//sorting descending
Descend(){
    let time = setTimeout(()=> {
    let sorted = [...this.statesData]
    this.asc = sorted.sort((a,b) => {return a.totalInfected - b.totalInfected})

    clearTimeout(time)
    }, 2000)
}

//sorting Ascending
Ascend(){
    let time = setTimeout(()=> {
    let sorted = [...this.statesData]
    this.asc = sorted.sort((a,b) => {return a.totalInfected - b.totalInfected}).reverse()
  //  console.log('ASC: ', this.asc);
  clearTimeout(time)
}, 2000)
}

// toggle click to switch descending sorting or ascending
handleLikeButtonClick() {
    this.sortState = !this.sortState 
    if(this.sortState){
        this.Descend()
    } else {
        this.Ascend();
        
    }
}
}