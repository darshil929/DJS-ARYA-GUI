const commandMap = (cmd, data) => {
    switch (cmd) {
        case 'start':
            return "1";
            
        case 'stop':
            return "2";

        case 'hs-open':
            return "3";

        case 'hs-stop':
            return "4";

        case 'hs-close':
            return "5";

        case 'ps':
            return "6";

        case 'po':
            return "7";
            
        case 'fs':
            return "8";

        case 'fu':
            return "9";

        case 'cal':
            return "b";
        
        case 'set-time':
            return `b-${data}-`;

        case 'camera':
            return "c";

        case 'sim-disable':
            return "d";

        case 'sim-enable':
            return "e";

        case 'pcr':
            return "p";

        case 'ssr':
            return "s";

        case 'sim-activate':
            return "t";

        case 'simp':
            return `t-${data}-`;
    
        default:
            console.log('Command cannot be mapped')
            break;
    }
}

export default commandMap;