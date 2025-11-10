<script>
(() => {
  const PANEL    = '.preview-video-content';
  const AVATAR   = '.preview-video__default-avatar';
  const STARTBTN = '#preview-video-control-button';
  const IFMCLS   = 'preview-camera-frame';
  const SRC      = location.protocol.startsWith('http') ? '/camera.html' : './camera.html';

  function ensure(panel){
    const cs = getComputedStyle(panel);
    if (cs.position === 'static') panel.style.position = 'relative';
    panel.style.overflow ||= 'hidden';
    panel.style.background ||= '#000';
    panel.style.borderRadius ||= '12px';
    const avatar = panel.querySelector(AVATAR);
    if (avatar) avatar.style.setProperty('display','none','important');
    const controls = panel.querySelector('.preview-video__control');
    if (controls) { controls.style.position='relative'; controls.style.zIndex='2'; }
  }
  function inject(panel){
    if (panel.querySelector('iframe.'+IFMCLS)) return;
    const f = document.createElement('iframe');
    f.className = IFMCLS;
    f.src = SRC;
    f.allow = 'camera *; microphone *; autoplay *; fullscreen *';
    f.sandbox = 'allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation';
    Object.assign(f.style,{position:'absolute',inset:'0',width:'100%',height:'100%',border:'0',zIndex:'1',background:'#000',borderRadius:'12px'});
    panel.prepend(f);
  }
  function mount(){
    const panel = document.querySelector(PANEL);
    if (!panel) return false;
    ensure(panel); inject(panel); return true;
  }
  if (!mount()){
    const mo = new MutationObserver(()=>{ if (mount()) mo.disconnect(); });
    mo.observe(document.documentElement,{childList:true,subtree:true});
  }
  const btn = document.querySelector(STARTBTN);
  if (btn) btn.addEventListener('click', mount);
})();
</script>
