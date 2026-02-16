import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CompletedSession, StageResponse, CategoryResults } from '../backend';

export function useGetAllSessions() {
  const { actor, isFetching } = useActor();

  return useQuery<CompletedSession[]>({
    queryKey: ['sessions'],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllSessions();
      return result.sortedByTimestamp.reverse();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetReconsiderationRate() {
  const { actor, isFetching } = useActor();

  return useQuery<number>({
    queryKey: ['reconsiderationRate'],
    queryFn: async () => {
      if (!actor) return 0;
      const rate = await actor.getReconsiderationRate();
      return Number(rate);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCategoryAnalysis() {
  const { actor, isFetching } = useActor();

  return useQuery<CategoryResults>({
    queryKey: ['categoryAnalysis'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCategoryAnalysis();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      actionTitle,
      stageResponses,
      finalDecision,
      outcome,
      timing,
    }: {
      actionTitle: string;
      stageResponses: StageResponse[];
      finalDecision: string;
      outcome: string;
      timing: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveSession(actionTitle, stageResponses, finalDecision, outcome, timing);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['reconsiderationRate'] });
      queryClient.invalidateQueries({ queryKey: ['categoryAnalysis'] });
    },
  });
}
