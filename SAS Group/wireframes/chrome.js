/* Shared mock chrome for SAS Group wireframes.
   Injects a sticky header (with Brands mega-dropdown) and footer
   into any page that has <div id="wf-header"></div> / <div id="wf-footer"></div>. */

const BRANDS = {
  retail: [
    ['ՍԱՍ սուպերմարկետների ցանց','SAS Supermarket', false],
    ['SAS.AM Marketplace','→ sas.am', true],
    ['ՍԱՍ Ֆուդ Քորթ','SAS Food Court', false],
    ['ՍԱՍ Սուիթ','SAS Sweet', false],
    ['ՍԱՍ Ներմուծում','SAS Import', false],
    ['ՍԱՍ Պրոդուկտ','SAS Product', false],
  ],
  lifestyle: [
    ['ՍԱՍ Հոմ','SAS Home', false],
    ['ԲԱԼԴԻ','BALDI', false],
    ['NEXT','franchise', true],
    ['ALDO','franchise', true],
  ],
};

function headerHTML(){
  const li = (arr)=>arr.map(([hy,en,ext])=>
    `<li>• ${hy} <span class="muted">— ${en}</span> ${ext?'<span class="ext">↗ external</span>':''}</li>`).join('');
  return `
  <header class="wf-header" style="position:relative">
    <div class="wf-logo"><b>SAS</b><span>&nbsp;GROUP</span></div>
    <nav class="wf-nav">
      <a href="about.html" class="has-menu" data-menu="about">ՄԵՐ ՄԱՍԻՆ</a>
      <a href="brands.html" class="has-menu" data-menu="brands">ԲՐԵՆԴՆԵՐ</a>
      <a href="careers.html">ԱՇԽԱՏԱՆՔ</a>
      <a href="media.html">ՄԵԴԻԱ</a>
      <a href="contact.html">ՀԵՏԱԴԱՐՁ ԿԱՊ</a>
    </nav>
    <div class="wf-lang"><b>ՀԱՅ</b> / ENG / РУС</div>
    <span class="btn red sm">Shop sas.am ↗</span>

    <div class="megamenu" id="megaBrands">
      <div class="cols">
        <div>
          <h5>Retail &amp; Food</h5>
          <ul>${li(BRANDS.retail)}</ul>
        </div>
        <div>
          <h5>Home &amp; Lifestyle</h5>
          <ul>${li(BRANDS.lifestyle)}</ul>
        </div>
      </div>
      <div class="note arrow" style="margin-top:14px">Brands mega-dropdown — each item → its brand page; external brands link out</div>
    </div>
  </header>`;
}

function footerHTML(){
  return `
  <footer class="wf-footer">
    <div class="cols">
      <div>
        <div class="flogo"><b>SAS</b> GROUP</div>
        <div style="font-size:13px;opacity:.9">About</div>
        <ul style="margin-top:8px">
          <li>Մեր մասին</li><li>Պատմություն</li>
          <li>Առաքելություն և արժեքներ</li><li>Գործընկերներ</li>
        </ul>
      </div>
      <div>
        <h5>Brands</h5>
        <ul>
          <li>SAS Supermarket</li><li>SAS.AM ↗</li><li>SAS Food Court</li>
          <li>SAS Sweet · Home · Import · Product</li><li>BALDI · NEXT ↗ · ALDO ↗</li>
        </ul>
      </div>
      <div>
        <h5>Careers &amp; Media</h5>
        <ul>
          <li>Աշխատանք</li><li>Թափուր աշխատատեղեր</li>
          <li>Նորություններ</li><li>Ֆոտոարխիվ</li>
        </ul>
      </div>
      <div>
        <h5>Contact</h5>
        <ul>
          <li>HQ հասցե, Երևան</li><li>+374 ·· ·· ·· ··</li><li>info@sasgroup.am</li>
        </ul>
        <div class="socials"><i>f</i><i>ig</i><i>in</i><i>yt</i></div>
      </div>
    </div>
    <div class="bottom">
      <span>© <span id="wf-year"></span> SAS Group · Registered entity «ՍԱՍ Գրուպ» ՍՊԸ · ՀՎՀՀ ········</span>
      <span>Privacy · Terms · ՀԱՅ / ENG / РУС</span>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded',()=>{
  const h=document.getElementById('wf-header');
  const f=document.getElementById('wf-footer');
  if(h) h.outerHTML=headerHTML();
  if(f) f.outerHTML=footerHTML();
  const y=document.getElementById('wf-year'); if(y) y.textContent=new Date().getFullYear();

  // brands mega-menu hover
  const mega=document.getElementById('megaBrands');
  const trigger=document.querySelector('[data-menu="brands"]');
  if(mega&&trigger){
    const open=()=>mega.classList.add('open');
    const close=()=>mega.classList.remove('open');
    trigger.addEventListener('mouseenter',open);
    trigger.addEventListener('click',(e)=>{e.preventDefault();mega.classList.toggle('open');});
    mega.addEventListener('mouseleave',close);
    document.querySelector('.wf-header').addEventListener('mouseleave',close);
  }

  // variation toggles
  document.querySelectorAll('.vartoggle').forEach(tog=>{
    const group=tog.getAttribute('data-group');
    tog.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const v=btn.getAttribute('data-v');
        tog.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===btn));
        document.querySelectorAll(`[data-variant][data-group="${group}"]`)
          .forEach(el=>el.classList.toggle('show', el.getAttribute('data-variant')===v));
      });
    });
  });
});
