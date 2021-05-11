var agamaContext;

const AGAMA_UPDATE_REASON = {
    SCHEDULED_UPDATE: 1,
    RESIZE: 2,
    CONFIG_CHANGE: 3,
    CREATE: 4
};

function onAgamaInitialize(context) {
    context.registerObserver(this);    
    agamaContext = context;    
}

function onUpdate(state, reason) {
    console.log(`Agama template hook: ${reason}`, agama);
    renderWidget();
}

function onConfiguration() {
    return {};
}
