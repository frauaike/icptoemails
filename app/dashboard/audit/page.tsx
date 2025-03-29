'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';

interface AuditLog {
  id: number;
  action: string;
  resource_type: string;
  resource_id: string;
  details: Record<string, any>;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export default function AuditLogPage() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [actionFilter, setActionFilter] = useState<string>('');
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        skip: ((page - 1) * limit).toString(),
        limit: limit.toString(),
        ...(actionFilter && { action: actionFilter }),
        ...(resourceTypeFilter && { resource_type: resourceTypeFilter }),
        ...(dateRange.start && { start_date: format(dateRange.start, 'yyyy-MM-dd') }),
        ...(dateRange.end && { end_date: format(dateRange.end, 'yyyy-MM-dd') }),
      });

      const response = await fetch(`/api/v1/audit/logs?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch audit logs');
      }

      const data = await response.json();
      setLogs(data);
      setTotal(data.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchLogs();
    }
  }, [session, page, actionFilter, resourceTypeFilter, dateRange]);

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({
        ...(dateRange.start && { start_date: format(dateRange.start, 'yyyy-MM-dd') }),
        ...(dateRange.end && { end_date: format(dateRange.end, 'yyyy-MM-dd') }),
      });

      const response = await fetch(`/api/v1/audit/logs/export?${params}`);
      if (!response.ok) {
        throw new Error('Failed to export audit logs');
      }

      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export audit logs');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <Button onClick={handleExport}>Export Logs</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Actions</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
          </SelectContent>
        </Select>

        <Select value={resourceTypeFilter} onValueChange={setResourceTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by resource type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Resources</SelectItem>
            <SelectItem value="icp">ICPs</SelectItem>
            <SelectItem value="email_analysis">Email Analysis</SelectItem>
          </SelectContent>
        </Select>

        <DatePicker
          value={dateRange.start}
          onChange={(date) => setDateRange({ ...dateRange, start: date })}
          placeholder="Start date"
        />

        <DatePicker
          value={dateRange.end}
          onChange={(date) => setDateRange({ ...dateRange, end: date })}
          placeholder="End date"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource Type</TableHead>
              <TableHead>Resource ID</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.resource_type}</TableCell>
                <TableCell>{log.resource_id}</TableCell>
                <TableCell>
                  <pre className="text-sm">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </TableCell>
                <TableCell>{log.ip_address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} entries
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * limit >= total}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 