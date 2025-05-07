/*  --------------------- AUTOMATIC CKK EVALUATION TOOL ----------------------  
; 
; 
    ==========================================================================
                          INSERT YOUR INFORMATION BELOW                       
    ========================================================================== */ 

    const schoolID  = "39xxx"           // school ID card (5 digits)
    const citizenID = "15xxxxxxxxxxx"   // citizen ID card (13 digits)
    const type      = "eq"              // teacher | sdq | apitude | general | eq
    const delay     = 1500              // depends on internet connection (ms)
          
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
;   5. Type: `git clone https://github.com/itonasd/ckk-eval-tool`
;   6. Type: `cd auto-evaluation-tool`
;   7. Type: `npm i puppeteer`
;   8. Goto: ./src/main.js right click on it, click on edit
;   9. After done inserting information, press Ctrl+S to save
;   10. Type: `node ./src/main`
;
;   To execute again, repeat from 8 to 10 
; 
;
; TROBLESHOOTING
;   git | npm is not recognized as a name of a cmdlet
;       -> try close and re-open powershell first, If the problem is not resolved, follow instruction below
;       -> add git | npm to PATH https://www.eukhost.com/kb/how-to-add-to-the-path-on-windows-10-and-windows-11/
;       -> in the “edit environment variable”, click “new” type <path/to/git | npm/folder>
; 
;   randomly error while executing
;       -> might be due to a slow internet connection, try increasing delay parameter above
;       -> if the problem is not resolved, browser might alert something while executing
;          and interrupts the execution, there is still no fix for this case
;
;
; UPDATE: 8/5/2025
;   -> grasha, kolb, intelligence, readiness, eq questions forms supported
;   -> from 0.5seconds to 1.5seconds default query delay
;
; INITIAL RELEASE: 14/3/2025
;
; android and ios are not supported
; this project was developed in just 2 days
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
        case "general":
            await run.evaluates();
            break;
        case "eq":
            await run.evaluateEQ();
            break;
        default:
            await run.evaluateTeacher();
            break;
    }

})()

