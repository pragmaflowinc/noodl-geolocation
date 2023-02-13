import { defineModule } from '@noodl/noodl-sdk';

import location from './nodes/location'

defineModule({
    reactNodes: [
    ],
    nodes:[
			location
    ],
    setup() {
    	//this is called once on startup
    }
});