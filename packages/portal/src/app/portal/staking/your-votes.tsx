import { useEffect, useState } from "react";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { StakingCard } from "@/app/portal/staking/staking-card";
import {
  votingContractABI,
  votingContractAddress,
} from "@/app/portal/staking/voting-contract-artifacts";
import {shortenAddress} from "@/app/portal/staking/lib/shorten-address";

export const YourVotes = () => {
  const { contract: voting, isLoading: isStakingLoading } = useContract(
    votingContractAddress,
    votingContractABI,
  );
  const address = useAddress();
  const [vote, setVote] = useState(""); // State to store the vote result
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchVotes = async () => {
      if (!voting || !address) return;

      setLoading(true);
      try {
        const result = await voting?.call("votes", [address]);
        setVote(result);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch votes:", error);
        setLoading(false);
      }
    };

    fetchVotes();
  }, [voting, address]); // Depend on voting and address to refetch when they change

  return (
    <StakingCard
      title={"You Voted for"}
      balance={
        loading
          ? shortenAddress("0x000000000000000000000000000000000000000000")
          : shortenAddress(vote) || "No vote found"
      }
    />
  );
};
