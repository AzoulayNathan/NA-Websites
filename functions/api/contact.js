const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function onRequestPost({request,env}){
  try{
    const data=await request.json();
    if(data.website) return Response.json({ok:true});
    const name=String(data.name||'').trim(); const email=String(data.email||'').trim(); const message=String(data.message||'').trim();
    if(!name||!EMAIL_RE.test(email)||!message) return Response.json({ok:false,error:'invalid'}, {status:400});
    if(!env.RESEND_API_KEY||!env.CONTACT_FROM_EMAIL||!env.CONTACT_TO_EMAIL) return Response.json({ok:false,error:'not_configured'}, {status:503});
    const html=`<h2>NA Websites contact</h2><p><b>Name:</b> ${escapeHtml(name)}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Company:</b> ${escapeHtml(String(data.company||''))}</p><p><b>Type:</b> ${escapeHtml(String(data.type||''))}</p><p><b>Budget:</b> ${escapeHtml(String(data.budget||''))}</p><p>${escapeHtml(message).replace(/\n/g,'<br>')}</p>`;
    const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM_EMAIL,to:[env.CONTACT_TO_EMAIL],reply_to:email,subject:`NA Websites — ${data.type||'contact'} — ${name}`,html})});
    if(!res.ok) return Response.json({ok:false,error:'delivery_failed'},{status:502});
    return Response.json({ok:true});
  }catch{return Response.json({ok:false,error:'bad_request'},{status:400});}
}
function escapeHtml(value){return value.replace(/[&<>'"]/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
