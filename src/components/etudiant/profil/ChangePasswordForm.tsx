"use client";

import { useState } from "react";
import { FaKey, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { motion } from "framer-motion";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    setError(null);
    setSuccess(null);
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError(
        "Le nouveau mot de passe et sa confirmation ne correspondent pas."
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/etudiant/profile/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || "Mot de passe mis à jour avec succès !");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError(
          data.message || "Erreur lors de la mise à jour du mot de passe."
        );
      }
    } catch (err) {
      setError("Erreur de connexion lors de la mise à jour du mot de passe.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white shadow rounded-lg p-6 border border-pink-200 animate-fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-pink-600 mb-4 flex items-center gap-2">
        <FaKey className="text-pink-500 animate-bounce" /> Changer le mot de
        passe
      </h3>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-shake"
          role="alert"
        >
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <FaExclamationTriangle className="h-6 w-6 fill-current" />
          </span>
        </div>
      )}
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 animate-slide-in-bottom"
          role="alert"
        >
          <strong className="font-bold">Succès!</strong>
          <span className="block sm:inline">{success}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <FaCheckCircle className="h-6 w-6 fill-current animate-pulse" />
          </span>
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="oldPassword"
          className="block text-sm font-semibold text-gray-700 mb-2 text-pink-800"
        >
          Ancien mot de passe
        </label>
        <input
          type="password"
          id="oldPassword"
          className="shadow-sm bg-pink-50 border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block text-sm font-semibold text-gray-700 mb-2 text-pink-800"
        >
          Nouveau mot de passe
        </label>
        <input
          type="password"
          id="newPassword"
          className="shadow-sm bg-pink-50 border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirmNewPassword"
          className="block text-sm font-semibold text-gray-700 mb-2 text-pink-800"
        >
          Confirmer le nouveau mot de passe
        </label>
        <input
          type="password"
          id="confirmNewPassword"
          className="shadow-sm bg-pink-50 border border-pink-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <motion.button
        onClick={handleChangePassword}
        className={`inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 font-semibold shadow-sm transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed animate-pulse" : ""
        }`}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <>
            <AiOutlineLoading className="animate-spin mr-2" /> Enregistrement...
          </>
        ) : (
          <>
            <FaKey className="mr-2" /> Changer le mot de passe
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default ChangePasswordForm;
