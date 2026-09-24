/**
 * Client MaishaPay - Mobile Money Collection V2
 * Doc : POST https://marchand.maishapay.online/api/collect/v2/store/mobileMoney
 *
 * ⚠️ Ce fichier ne doit être importé QUE côté serveur (route handlers, server actions).
 */

const BASE_URL =
  process.env.MAISHAPAY_BASE_URL ?? "https://marchand.maishapay.online/api";

export type MobileMoneyProvider =
  | "AIRTEL"
  | "ORANGE"
  | "MTN"
  | "MPESA"
  | "AFRIMONEY";

export type MaishaStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface CollectMobileMoneyInput {
  /** Référence unique générée par tes soins */
  transactionReference: string;
  /** Montant en string, ex: "1000000" */
  amount: string;
  /** CDF, USD, XAF, XOF, ... */
  currency: string;
  customerFullName?: string;
  customerEmailAdress?: string;
  provider: MobileMoneyProvider;
  /** Numéro au format international, ex: "+243997447204" */
  walletID: string;
  /** URL publique qui recevra le POST final de MaishaPay */
  callbackUrl: string;
}

export interface MaishaPayResponse {
  status_code: number;
  transactionStatus: MaishaStatus;
  transactionId: number;
  originatingTransactionId: string;
  order: {
    customerFullName?: string;
    customerEmailAdress?: string;
    cost: {
      amount: number;
      frais: number;
      total: number;
      currency: string;
    };
  };
  paymentChannel: {
    channel: string;
    provider: { libelle: string; picture: string };
    walletID: string;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Envoie la requête d'initiation de collecte Mobile Money.
 * Retourne aussi le HTTP status pour distinguer 202 / 4xx / 5xx.
 */
export async function collectMobileMoney(input: CollectMobileMoneyInput) {
  const publicApiKey = process.env.MAISHAPAY_PUBLIC_KEY;
  const secretApiKey = process.env.MAISHAPAY_SECRET_KEY;
  const gatewayMode = process.env.MAISHAPAY_GATEWAY_MODE ?? "0";

  if (!publicApiKey || !secretApiKey) {
    throw new Error("Clés API MaishaPay manquantes dans les variables d'env.");
  }

  const payload = {
    transactionReference: input.transactionReference,
    gatewayMode, // "1" = LIVE, "0" = SANDBOX
    publicApiKey,
    secretApiKey,
    order: {
      amount: input.amount,
      currency: input.currency,
      customerFullName: input.customerFullName,
      customerEmailAdress: input.customerEmailAdress,
    },
    paymentChannel: {
      channel: "MOBILEMONEY",
      provider: input.provider,
      walletID: input.walletID,
      callbackUrl: input.callbackUrl,
    },
  };

  const res = await fetch(`${BASE_URL}/collect/v2/store/mobileMoney`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  let data: MaishaPayResponse | any = null;
  try {
    data = await res.json();
    console.log('RESPONSE MAISHA : ', data);
  } catch {
    data = null;
  }

  return { httpStatus: res.status, data, sentPayload: payload };
}

/**
 * Normalise le statut reçu (la doc montre parfois "PENDING " avec un espace).
 */
export function normalizeStatus(raw: unknown): MaishaStatus | null {
  if (typeof raw !== "string") return null;
  const s = raw.trim().toUpperCase();
  if (s === "PENDING" || s === "SUCCESS" || s === "FAILED") return s;
  return null;
}