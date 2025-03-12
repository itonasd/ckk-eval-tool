/*  --------------------- AUTOMATIC CKK EVALUATION TOOL ----------------------  
; 
; 
    ==========================================================================
                          INSERT YOUR INFORMATION BELOW                       
    ========================================================================== */ 

    const schoolID  = "39350"           // school ID card (5 digits)
    const citizenID = "1509966678267"   // citizen ID card (13 digits)
    const type      = "sdq"             // teacher | sdq | atitude
    const delay     = 500               // depends on internet connection (ms)
          
/*  ==========================================================================
                               BUILT BY AomIsReal                            
    ==========================================================================
; 
; 
; HOW TO EXECUTE (STEP BY STEP GUIDE) 
;   1. Open powershell
;   2. Type: `winget install --id Git.Git -e --source winget`
;   3. Type: `winget install -e --id OpenJS.NodeJS`
;   4. Close and re-open powershell
;   5. Type: git clone https://github.com/itonasd/auto-evaluation-tool
;   6. Type: cd auto-evaluation-tool
;   7. Type: `npm i puppeteer`
;   8. Type: `node ./src/main`
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
; 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */ 
   
import { EvaluateConfig } from "./preprocessor.js";
import { Main } from "./features.js";

export const config = new EvaluateConfig({
   _schoolID: schoolID,
   _citizenID: citizenID,
   _evaluateType: type,
   _evaluateDelay: delay
});

const run = new Main();
    
(async() => {

    await run.init();

    switch(type.toLowerCase()) {
        case "apitude":
            await run.evaluateApitude();
            break;
        case "sdq":
            await run.evaluateSDQ();
            break;
        default:
            await run.evaluateTeacher();
            break;
    }

})()

