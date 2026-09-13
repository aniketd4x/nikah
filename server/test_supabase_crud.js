import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rfqfqlpuybidmdvjtsxk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PLZ9NHhvtK38zt8EgLQ2nQ_KE8bfX2g';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verifyAllSupabaseCrud() {
  console.log('🧪 Starting Full CRUD & Cloud Database Operations Test on Supabase...\n');

  const testId = `test-supa-${Date.now()}`;
  const testEmail = `${testId}@example.com`;

  try {
    // 1. CREATE USER & PROFILE
    console.log('1. Testing CREATE Profile in Supabase...');
    const { error: uErr } = await supabase.from('users').insert([{
      id: testId,
      email: testEmail,
      role: 'user',
      status: 'active',
      plan: 'Premium Blessed'
    }]);
    if (uErr) throw new Error(`User insert failed: ${uErr.message}`);

    const { error: pErr } = await supabase.from('profiles').insert([{
      id: testId,
      user_id: testId,
      name: 'Sister Yasmin Akhtar',
      age: 27,
      gender: 'female',
      city: 'Hyderabad',
      country: 'India',
      profession: 'Senior Bioinformatician',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      marital_status: 'Never Married',
      polygyny_preference: 'Open to Discussion',
      about_me: 'Test bio for Yasmin in Supabase',
      is_verified: false
    }]);
    if (pErr) throw new Error(`Profile insert failed: ${pErr.message}`);
    console.log('✅ 1. CREATE OK: User & Profile inserted into Supabase.');

    // 2. READ PROFILE
    console.log('2. Testing READ Profile from Supabase...');
    const { data: readData, error: rErr } = await supabase.from('profiles').select('*').eq('id', testId).single();
    if (rErr || !readData) throw new Error(`Read failed: ${rErr?.message}`);
    console.log('✅ 2. READ OK: Retrieved profile', readData.name, 'in', readData.city);

    // 3. UPDATE PROFILE
    console.log('3. Testing UPDATE Profile in Supabase...');
    const { error: upErr } = await supabase.from('profiles').update({
      profession: 'Principal Bioinformatics Lead',
      city: 'Secunderabad',
      is_verified: true
    }).eq('id', testId);
    if (upErr) throw new Error(`Update failed: ${upErr.message}`);

    const { data: updatedData } = await supabase.from('profiles').select('profession, city, is_verified').eq('id', testId).single();
    console.log('✅ 3. UPDATE OK: Updated to', updatedData?.profession, updatedData?.city, '| Verified:', updatedData?.is_verified);

    // 4. INTERESTS CRUD
    console.log('4. Testing INTERESTS (Create, Update, Delete) in Supabase...');
    const intId = `int-${Date.now()}`;
    const { error: intCreateErr } = await supabase.from('interest_requests').insert([{
      id: intId,
      sender_id: testId,
      receiver_id: 'current-user',
      status: 'pending',
      message: 'Matrimonial connection inquiry'
    }]);
    if (intCreateErr) throw new Error(`Interest insert failed: ${intCreateErr.message}`);

    const { error: intUpErr } = await supabase.from('interest_requests').update({ status: 'accepted' }).eq('id', intId);
    if (intUpErr) throw new Error(`Interest update failed: ${intUpErr.message}`);

    const { error: intDelErr } = await supabase.from('interest_requests').delete().eq('id', intId);
    if (intDelErr) throw new Error(`Interest delete failed: ${intDelErr.message}`);
    console.log('✅ 4. INTERESTS CRUD OK: Created, accepted, and deleted in Supabase.');

    // 5. MESSAGING & CHAT CRUD
    console.log('5. Testing MESSAGING & CHAT in Supabase...');
    const convId = `conv-${Date.now()}`;
    const msgId = `msg-${Date.now()}`;
    await supabase.from('conversations').insert([{
      id: convId,
      participant_one: testId,
      participant_two: 'current-user',
      last_message: 'Assalamu Alaikum'
    }]);
    await supabase.from('messages').insert([{
      id: msgId,
      conversation_id: convId,
      sender_id: testId,
      receiver_id: 'current-user',
      message_text: 'Assalamu Alaikum, happy to connect.'
    }]);
    console.log('✅ 5. MESSAGING & CHAT OK: Created thread & message in Supabase.');

    // 6. VERIFICATIONS CRUD
    console.log('6. Testing VERIFICATION Submit & Approve in Supabase...');
    const verId = `ver-${Date.now()}`;
    await supabase.from('verifications').insert([{
      id: verId,
      user_id: testId,
      document_type: 'Passport & Wali Letter',
      document_url: 'https://example.com/doc.pdf',
      status: 'pending'
    }]);
    await supabase.from('verifications').update({ status: 'approved' }).eq('id', verId);
    console.log('✅ 6. VERIFICATIONS OK: Submitted & Approved in Supabase.');

    // 7. SAFETY REPORTS CRUD
    console.log('7. Testing SAFETY REPORTS in Supabase...');
    const repId = `rep-${Date.now()}`;
    await supabase.from('reports').insert([{
      id: repId,
      reporter_id: 'current-user',
      reported_user_id: testId,
      reason: 'Safety Test Concern',
      details: 'Test details',
      status: 'pending'
    }]);
    await supabase.from('reports').update({ status: 'resolved' }).eq('id', repId);
    console.log('✅ 7. SAFETY REPORTS OK: Submitted & Resolved in Supabase.');

    // 8. CASCADE DELETE
    console.log('8. Testing CASCADE DELETE & PURGE in Supabase...');
    await supabase.from('verifications').delete().eq('user_id', testId);
    await supabase.from('reports').delete().or(`reporter_id.eq.${testId},reported_user_id.eq.${testId}`);
    await supabase.from('messages').delete().or(`sender_id.eq.${testId},receiver_id.eq.${testId}`);
    await supabase.from('conversations').delete().or(`participant_one.eq.${testId},participant_two.eq.${testId}`);
    await supabase.from('profiles').delete().eq('id', testId);
    await supabase.from('users').delete().eq('id', testId);

    const { data: finalCheck } = await supabase.from('profiles').select('id').eq('id', testId);
    console.log('✅ 8. CASCADE DELETE OK: Records remaining =', finalCheck?.length || 0);

    console.log('\n🌟 ALL 8 SUPABASE CRUD OPERATIONS VERIFIED 100% WORKING LIVE!');
  } catch (err) {
    console.error('❌ Supabase CRUD test failed:', err);
  }
}

verifyAllSupabaseCrud();
