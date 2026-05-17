# 1. Start PostgreSQL Shards

docker compose up -d

# 2. Verify Containers

docker ps

# 3. Start API Server

npm run dev

# 4. Run Load Test

k6 run put-load-test.js

# 5. Open CPU Monitor (new terminal)

docker stats

# 6. Open PostgreSQL Shell

docker exec -it shard1 psql -U user -d kvstore

# 7. Check Total Rows

SELECT COUNT(*) FROM store;

# 8. Check Expired Rows

SELECT COUNT(*)
FROM store
WHERE expired_at <= NOW();

# 9. Check Table Size

SELECT
pg_size_pretty(
pg_total_relation_size('store')
);

# 10. Check Query Plan

EXPLAIN ANALYZE
SELECT *
FROM store
WHERE expired_at <= NOW();

# 11. Benchmark Cleanup Query

EXPLAIN ANALYZE
DELETE FROM store
WHERE expired_at <= NOW();

# 12. Check Dead Tuples

SELECT
relname,
n_live_tup,
n_dead_tup
FROM pg_stat_user_tables
WHERE relname = 'store';

# 13. Check WAL Position

SELECT pg_current_wal_lsn();

# 14. Open WAL Directory

docker exec -it shard1 bash

cd /var/lib/postgresql/data/pg_wal

ls -lh

# 15. Watch WAL Size Live

watch -n 1 'du -sh /var/lib/postgresql/data/pg_wal'

# 16. Run Vacuum

VACUUM ANALYZE store;

# 17. Recheck Dead Tuples

SELECT
relname,
n_live_tup,
n_dead_tup
FROM pg_stat_user_tables
WHERE relname = 'store';
