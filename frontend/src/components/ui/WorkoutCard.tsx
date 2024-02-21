import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '../../utils/formatDate';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from './button';
import axios from 'axios';

type WorkoutCardProps = {
  workout: {
    _id: string;
    title: string;
    description?: string;
    reps?: number;
    sets?: number;
    weight?: number;
    rest?: number;
    date: Date;
  };
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => axios.delete(`http://localhost:3000/api/workouts/${id}`),
  });

  async function handleDelete(id: string) {
    await axios.delete(`http://localhost:3000/api/workouts/${id}`);
    queryClient.invalidateQueries({ queryKey: ['workouts'] });
  }

  return (
    <Card className='w-[350px] mx-auto'>
      <CardHeader>
        <CardTitle>{workout.title}</CardTitle>
        <CardDescription>{workout?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Reps</p>
            <p>{workout.reps}</p>
          </div>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Sets</p>
            <p>{workout.sets}</p>
          </div>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Weight</p>
            <p>{workout.weight}</p>
          </div>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Rest</p>
            <p>{workout.rest}</p>
          </div>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Date</p>
            <p>{formatDate(workout.date.toString())}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          onClick={() => handleDelete(workout._id)}
          disabled={mutation.isPending}
          className='bg-red-600 hover:bg-red-700 p-2 rounded-md text-white'
        >
          Delete
        </Button>
        {mutation.isError && <p>Error: {mutation.error.message}</p>}
      </CardFooter>
    </Card>
  );
}
