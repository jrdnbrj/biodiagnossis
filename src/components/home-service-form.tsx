'use client';

import { FormEvent, useState } from 'react';
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
  return <form className="home-form" onSubmit={submit} noValidate><label>Nombre completo<input name="name" autoComplete="name" /></label><label>Teléfono<input name="phone" inputMode="tel" autoComplete="tel" /></label><label>Dirección<textarea name="address" rows={3} /></label><label>Exámenes que necesita <span>(opcional)</span><input name="exams" /></label><label>Fecha u horario preferido <span>(opcional)</span><input name="date" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary" type="submit">Continuar por WhatsApp</button><p className="form-note">Se abrirá WhatsApp con su solicitud. La cobertura y disponibilidad se confirmarán por ese medio.</p></form>;
}
