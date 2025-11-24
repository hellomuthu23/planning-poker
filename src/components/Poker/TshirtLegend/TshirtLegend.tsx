import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import './TshirtLegend.css';

export const TshirtLegend = () => {
  return (
    <Card variant='outlined' className='TshirtLegendCard'>
      <CardContent className='TshirtLegendCardContent'>
        <TableContainer className='TshirtLegendTableContainer'>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Size</TableCell>
                <TableCell>Typical Effort</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Typical Effort</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Typical Effort</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Typical Effort</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className='TShirtSize'>XXS</TableCell>
                <TableCell align='left'>1-5 PD</TableCell>
                <TableCell className='TShirtSize'>XS</TableCell>
                <TableCell align='left'>5-10 PD</TableCell>
                <TableCell className='TShirtSize'>S</TableCell>
                <TableCell align='left'>11-20 PD</TableCell>
                <TableCell className='TShirtSize'>M</TableCell>
                <TableCell align='left'>21-50 PD</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='TShirtSize'>L</TableCell>
                <TableCell align='left'>51-100 PD</TableCell>
                <TableCell className='TShirtSize'>XL</TableCell>
                <TableCell align='left'>101-300 PD</TableCell>
                <TableCell className='TShirtSize'>XXL</TableCell>
                <TableCell align='left'>301-10000 PD</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
