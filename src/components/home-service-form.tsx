'use client';

import { FormEvent, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/whatsapp';

export function HomeServiceForm() {
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const address = String(data.get('address') ?? '').trim();
    if (!name || !phone || !address) { setError('Complete su nombre, teléfono y dirección para continuar.'); return; }
    setError('');
    const exams = String(data.get('exams') ?? '').trim() || 'Por confirmar';
    const date = String(data.get('date') ?? '').trim() || 'Por confirmar';
    window.open(whatsappUrl(`Hola, quisiera coordinar atención a domicilio.\nNombre: ${name}\nTeléfono: ${phone}\nDirección: ${address}\nExámenes: ${exams}\nFecha u horario preferido: ${date}`), '_blank', 'noopener,noreferrer');
  }
  return <form className="home-form original-home-form" onSubmit={submit} noValidate><div className="form-heading"><h2>Datos iniciales</h2><p>Este formulario no confirma la visita. Al enviarlo se abrirá WhatsApp para continuar.</p></div><div className="form-row"><label>Nombre *<input name="name" autoComplete="name" /></label><label>Teléfono *<input name="phone" inputMode="tel" autoComplete="tel" placeholder="098XXXXXXX" /></label></div><label>Sector o dirección de referencia *<input name="address" placeholder="Ej.: El Inca, cerca de..." /></label><label>Exámenes solicitados <span>(opcional)</span><textarea name="exams" rows={4} placeholder="Escriba los nombres o indique que enviará la orden por WhatsApp" /></label><div className="form-row"><label>Fecha preferida <input name="date" type="date" /></label><label>Rango horario <select name="time"><option>Por coordinar</option><option>Mañana</option><option>Tarde</option></select></label></div>{error && <p className="form-error" role="alert">{error}</p>}<label className="consent"><input type="checkbox" required />Acepto enviar estos datos para revisar mi solicitud. La visita queda pendiente de confirmación.</label><button className="button button-primary" type="submit"><MessageCircle size={19} aria-hidden="true" />Continuar por WhatsApp</button></form>;
}
