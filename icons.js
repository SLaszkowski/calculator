import { library, dom } from '@fortawesome/fontawesome-svg-core';

// Import only needed Icons
import { faC, faDeleteLeft, faDivide, faMultiply, faMinus, faPlus, faEquals } from '@fortawesome/free-solid-svg-icons';

library.add(faC, faDeleteLeft, faDivide, faMultiply, faMinus, faPlus, faEquals);
dom.watch();