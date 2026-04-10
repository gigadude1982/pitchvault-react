import { supabase } from '../lib/supabase';

// ── HELPERS ──────────────────────────────────────────────────────────────────

function mapChat(row) {
  return {
    id: row.id,
    name: row.name,
    init: row.init,
    campaign: row.campaign,
    status: row.status,
    statusClass: row.status_class,
    unread: row.unread,
    revisions: row.revisions,
    maxRevisions: row.max_revisions,
    preview: row.preview,
    messages: (row.messages || [])
      .sort((a, b) => a.id - b.id)
      .map((m) => ({
        id: m.id,
        from: m.from_role,
        text: m.message_text,
        file: m.file_name,
        fileType: m.file_type,
        delivery: m.delivery,
        time: m.sent_time,
      })),
  };
}

function mapCreator(row) {
  return {
    ...row,
    reviews: (row.creator_reviews || []).map((r) => ({
      id: r.id,
      brand: r.brand,
      rating: r.rating,
      text: r.review_text,
      date: r.review_date,
    })),
  };
}

// ── CREATORS ─────────────────────────────────────────────────────────────────

export const db = {
  async getCreators() {
    const { data } = await supabase.from('creators').select('*').order('id');
    return data ?? [];
  },

  async getCreatorById(id) {
    const { data } = await supabase
      .from('creators')
      .select('*, creator_reviews(*)')
      .eq('id', id)
      .single();
    return data ? mapCreator(data) : null;
  },

  async addReview(creatorId, review) {
    await supabase.from('creator_reviews').insert({
      creator_id: creatorId,
      brand: review.brand,
      rating: review.rating,
      review_text: review.text,
      review_date: review.date,
    });
  },

  // ── PAYMENTS ───────────────────────────────────────────────────────────────

  async getPayments() {
    const { data } = await supabase.from('payments').select('*').order('id');
    return data ?? [];
  },

  async releasePayment(id) {
    await supabase
      .from('payments')
      .update({ status: 'released', status_label: 'Released' })
      .eq('id', id);
  },

  // ── CAMPAIGNS ──────────────────────────────────────────────────────────────

  async getCampaigns() {
    const { data } = await supabase.from('campaigns').select('*').order('id');
    return data ?? [];
  },

  async pauseCampaign(id) {
    await supabase.from('campaigns').update({ status: 'Paused' }).eq('id', id);
  },

  // ── DEALS ──────────────────────────────────────────────────────────────────

  async getDeals() {
    const { data } = await supabase.from('deals').select('*').order('id');
    return data ?? [];
  },

  async acceptDeal(id) {
    await supabase.from('deals').update({ status: 'active' }).eq('id', id);
  },

  async declineDeal(id) {
    await supabase.from('deals').update({ status: 'declined' }).eq('id', id);
  },

  // ── PRODUCTS ───────────────────────────────────────────────────────────────

  async getProducts() {
    const { data } = await supabase.from('products').select('*').order('id');
    return data ?? [];
  },

  // ── CHATS & MESSAGES ───────────────────────────────────────────────────────

  async getChats() {
    const { data } = await supabase.from('chats').select('*, messages(*)').order('id');
    return (data ?? []).map(mapChat);
  },

  async addMessage(chatId, msg, newRevisionCount) {
    const ops = [
      supabase.from('messages').insert({
        chat_id: chatId,
        from_role: msg.from,
        message_text: msg.text ?? null,
        file_name: msg.file ?? null,
        file_type: msg.fileType ?? null,
        delivery: msg.delivery ?? false,
        sent_time: msg.time,
      }),
      supabase
        .from('chats')
        .update({ preview: msg.text || `Uploaded ${msg.file}` })
        .eq('id', chatId),
    ];
    if (newRevisionCount !== undefined) {
      ops.push(supabase.from('chats').update({ revisions: newRevisionCount }).eq('id', chatId));
    }
    await Promise.all(ops);
  },

  async markFinalDelivery(messageId, chatId) {
    await Promise.all([
      supabase.from('messages').update({ delivery: true }).eq('id', messageId),
      supabase
        .from('chats')
        .update({ status: 'Delivered', status_class: 'status-delivered' })
        .eq('id', chatId),
    ]);
  },

  // ── ANALYTICS ──────────────────────────────────────────────────────────────

  async getAnalyticsStats() {
    const { data } = await supabase.from('analytics_stats').select('*').order('id');
    return data ?? [];
  },

  async getAnalyticsMonthly() {
    const { data } = await supabase.from('analytics_monthly').select('*').order('id');
    return data ?? [];
  },

  async getAnalyticsNiches() {
    const { data } = await supabase.from('analytics_niches').select('*').order('id');
    return data ?? [];
  },

  // ── SUBSCRIPTION ───────────────────────────────────────────────────────────

  async getSubscriptionFeatures() {
    const { data } = await supabase.from('subscription_features').select('*').order('id');
    return data ?? [];
  },

  // ── CREATOR PROFILE (logged-in creator dashboard) ──────────────────────────

  async getCreatorProfile() {
    const { data } = await supabase.from('creator_profile').select('*').limit(1).single();
    return data ?? null;
  },

  async getCreatorEarnings() {
    const { data } = await supabase.from('creator_earnings').select('*').order('id');
    return data ?? [];
  },
};
